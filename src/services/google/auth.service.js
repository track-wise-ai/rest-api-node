const { google } = require("googleapis");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

class GoogleAuthService {
  constructor() {
    this.oauth2Client = new google.auth.OAuth2({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUri: REDIRECT_URI,
    });
  }

  async renewCredentials(user) {
    if (!user.google.tokens) {
      throw new Error("No access token");
    }
    this.oauth2Client.setCredentials(user.google.tokens);
    return this.oauth2Client;
  }

  generateAuthUrl(state) {
    return this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      state,
      prompt: "consent",
    });
  }

  async getToken(code) {
    return await this.oauth2Client.getToken(code);
  }
}

module.exports = { GoogleAuthService };
