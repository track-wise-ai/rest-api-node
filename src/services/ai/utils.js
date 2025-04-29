const exampleActivities = [
  {
    "date": "2024-11-11",
    "summary": "Participated in the UX team daily standup and joined the Candidate Hub introduction. Spent the day reviewing the QA environment and working with developers to address issues. Also attended a Candidate Hub session and retrospective."
  },
  {
    "date": "2024-11-12",
    "summary": "Continued reviewing the QA environment and collaborating with developers to provide feedback. Attended grooming sessions focused on templates and participated in PM/UX syncs and a Candidate Interview."
  },
  {
    "date": "2024-11-13",
    "summary": "Focused on CMS usability fixes and resolving issues identified during QA reviews. Worked closely with Olena and developers to finalize feedback. Participated in CMS Usability Status Update, CH UX fixes, and other planned sessions."
  },
  {
    "date": "2024-11-14",
    "summary": "Shifted focus to pre-release tasks, including final discussions during the \"Go/No Go Final Discussion\" meeting. Collaborated with Raz, Mira, and other team members on resolving pending issues and preparing for the release. Joined CMS grooming and pre-grooming sessions."
  }
];

const role = "You are an expert assistant who converts raw Google Calendar data into concise daily activity summaries for Jira.";

const buildPrompt = (events) => {
  return `
${role}
INPUTS
  * events: ${JSON.stringify(events)}
  * example_output: ${JSON.stringify(exampleActivities)}
TASK
1. Convert every start/end to the given timezone.
2. Group events by calendar day (00:00–23:59 local).
3. For each day that contains ≥1 event, write ONE English sentence (≈20–30 words) summarising the day’s activities; merge similar themes; omit IDs and times.
4. Exclude days with no events.
5. Respond only with STRICT JSON:
[
  { "date": "YYYY-MM-DD", "summary": "<one-sentence overview>" },
  …
]

Return JSON only — no markdown or extra text.
`.trim();
};

module.exports = { buildPrompt };
