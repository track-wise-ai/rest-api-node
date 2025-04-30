const mongoose = require("mongoose");
const { User, GoogleOAuthTemporaryDepot } = require("../models");
const { GoogleAuthService, GoogleCalendarService } = require("../services");

const googleAuthService = new GoogleAuthService();
const googleCalendarService = new GoogleCalendarService(googleAuthService);

const settings = async (req, reply) => {
  try {
    const { email } = req.user.payload;
    const user = await User.findOne({ email });
    const state = (new mongoose.Types.ObjectId()).toString();
    const authUrl = await googleAuthService.generateAuthUrl(state);
    const calendars = await googleCalendarService.getCalendars(user). catch(() => []);

    await GoogleOAuthTemporaryDepot.findOneAndUpdate(
      { user: user._id },
      { state },
      { upsert: true },
    );

    reply.send({
      authUrl,
      connect: Boolean(user.google.tokens),
      calendars,
      selectedCalendars: user.google?.calendarIds || [],
    });
  } catch (error) {
    reply.status(500).send(error);
  }
};

const connect = async (req, reply) => {
  setTimeout(() => {
    reply.send({ google: "connect" });
  }, 3000);
};

const disconnect = async (req, reply) => {
  reply.send({ google: "disconnect" });
};

const callback = async (req, reply) => {
  const { state, code } = req.query;
  const { tokens } = await googleAuthService.getToken(code);
  const pair = await GoogleOAuthTemporaryDepot.findOneAndDelete({ state });
  const user = await User.findById(`${pair.user._id}`);

  if (user) {
    user.google.tokens = tokens;
    await user.save();
  }

  reply.send({ google: "callback" });
};

const root = async (req, reply) => {
  const { email } = req.user.payload;
  const { start, end } = req.query;

  try {
    const user = await User.findOne({ email });

    const events = await Promise.all((user?.google?.calendarIds || []).map((calendarId) => {
      return googleCalendarService.getEvents(user, calendarId, { start, end });
    }));

    const sortedEvents = events
      .flat()
      .sort((a, b) => {
        const aStart = new Date(a.start.dateTime || a.start.date);
        const bStart = new Date(b.start.dateTime || b.start.date);
        return aStart - bStart;
      });

    return reply.send({ events: sortedEvents });
  } catch (error) {
    reply.status(500).send(error);
  }
};

module.exports = { settings, callback, connect, disconnect, root };
