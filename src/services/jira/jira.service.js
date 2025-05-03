const { formatISO } = require("date-fns");

class JiraService {
  constructor() {
    this.baseUrl = null;
    this.headers = null;
  }

  init(url, apiKey) {
    if (!url || !apiKey) {
      throw new Error('Jira URL and API key are required');
    }

    this.baseUrl = url;
    this.headers = {
      "Authorization": `Bearer ${apiKey}`,
      // 'Authorization': `Basic ${Buffer.from(`ilia.makarov@me.com:${apiKey}`).toString('base64')}`,
      "Content-Type": "application/json",
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
