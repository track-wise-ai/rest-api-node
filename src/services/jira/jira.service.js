const { formatISO } = require("date-fns");

class JiraService {
  constructor() {
    this.baseUrl = null;
    this.headers = null;
  }

  init({ url, apiKey, authType, email }) {
    if (!url || !apiKey) {
      throw new Error('Jira URL and API key are required');
    }

    if (authType === "basic" && !email) {
      throw new Error('Email is required for basic authentication');
    }

    this.baseUrl = url;
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": (authType === "basic")
        ? `Basic ${Buffer.from(`ilia.makarov@me.com:${apiKey}`).toString('base64')}`
        : `Bearer ${apiKey}`
    };
  }

  async addWorkLog(issueKey, trackLog) {
    if (!this.baseUrl || !this.headers) {
      throw new Error('Jira service not initialized');
    }

    const endpoint = `${this.baseUrl}/rest/api/2/issue/${issueKey}/worklog`;
    const startDate = `${formatISO(new Date(trackLog.date), { representation: "date" })}T10:00:00.000+0000`;

    const payload = {
      timeSpent: "8h",
      started: startDate,
      comment: trackLog.summary,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      return result;
    } catch (error) {
      console.error('Error adding worklog to Jira:', error);
      throw error;
    }
  }
}

module.exports = { JiraService };
