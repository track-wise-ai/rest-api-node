import {} from '../types';

const exampleActivities = [
  {
    date: '2024-11-11',
    summary:
      'Participated in UX standup, Candidate Hub introduction, QA environment review with developers, and retrospective session.',
  },
  {
    date: '2024-11-12',
    summary:
      'Continued QA environment review, attended template grooming sessions, PM/UX syncs, and candidate interview.',
  },
  // {
  //   date: '2024-11-13',
  //   summary:
  //     'Focused on CMS usability fixes with Olena, attended status updates and UX fix sessions.',
  // },
  // {
  //   date: '2024-11-14',
  //   summary:
  //     'Handled pre-release tasks including Go/No Go discussion with Raz and Mira, plus CMS grooming sessions.',
  // },
];

const role =
  'You are an expert assistant who converts raw Google Calendar data into concise daily activity summaries for Jira.';

const buildPrompt = (events, timezone = 'UTC') => {
  return `Convert Google Calendar events to daily activity summaries for Jira.

INPUTS: ${JSON.stringify(events, null, 0)}

REQUIREMENTS:
* Convert times to ${timezone} timezone
* Group by calendar day (00:00-23:59)
* One concise sentence per day (20-30 words)
* Merge similar activities
* Skip days with no events
* Output strict JSON only

EXAMPLE OUTPUT:
${JSON.stringify(exampleActivities, null, 0)}

Return JSON array only
`.trim();
};

export { buildPrompt };
