import { AiGenerateEventDto, AiGenerateEventsDto } from '../dto';

const formatEvents = (event: AiGenerateEventDto) => ({
  start: event.start.dateTime || event.start.date,
  end: event?.end?.dateTime || event?.end?.date,
  summary: event?.summary || '',
  ...(event?.description ? { description: event.description } : {}),
});

const buildPrompt = (
  events: AiGenerateEventsDto['events'],
  fineTuning: string = '',
) => {
  const formatedEvents = (events || []).map(formatEvents);

  const message =
    `Convert Google Calendar events to Jira worklog-style daily summaries.

INPUTS: ${JSON.stringify(formatedEvents, null, 0)}

REQUIREMENTS:
- Normalize event times to UTC.
- Ignore events where start time equals end time.
- Group events by calendar day (00:00–23:59 UTC).
- Merge similar activities (e.g. interviews, company meetings).
- Skip days with no events.
- For each day, return one concise sentence (20–30 words) in past tense, summarizing activities.
- Use professional, neutral tone. Avoid emojis, links, personal pronouns.
- Output only a minified JSON array in this schema: [{"date":"YYYY-MM-DD","summary":"..."}]
- ${fineTuning}
`.trim();

  return message;
};

export { buildPrompt };
