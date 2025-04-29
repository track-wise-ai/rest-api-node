const { google } = require("googleapis");
const { startOfWeek, endOfWeek, format } = require("date-fns");

class GoogleCalendarService {
  constructor(authService) {
    this.authService = authService;
  }

  async getCalendars(user) {
    const auth = await this.authService.renewCredentials(user);
    const calendar = google.calendar({ version: "v3", auth });
    const calendarList = await calendar.calendarList.list();
    return calendarList.data.items;
  }

  async getEvents(user, calendarId) {
    const auth = await this.authService.renewCredentials(user);
    const calendar = google.calendar({ version: "v3", auth });
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday as start of week
    const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 }); // Sunday as end of week

    const res = await calendar.events.list({
      calendarId: calendarId,
      timeMin: weekStart.toISOString(),
      timeMax: weekEnd.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    return res.data.items;
  }

  async getEvent(user, eventId) {
    const auth = await this.authService.renewCredentials(user);
    const calendar = google.calendar({ version: "v3", auth });
    const res = await calendar.events.get({
      calendarId: calendarId,
      eventId: eventId,
    });
    return res.data;
  }
}

module.exports = { GoogleCalendarService };
