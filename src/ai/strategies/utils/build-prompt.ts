import { type AiGenerateEventsDto } from '../../dto';
import { type Options } from '../../types';
import { formatEvents } from './format-events';
import { summaryLevelMap } from '../../constants';
import { SummaryLevel } from '../../../settings/types';

const buildPrompt = (
  events: AiGenerateEventsDto['events'],
  options: Options,
) => {
  const summaryLevel: SummaryLevel =
    options.summaryLevel || SummaryLevel.MEDIUM;
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
- Use professional, neutral tone. Avoid emojis, links, personal pronouns.
- Output only a minified JSON array in this schema: [{"date":"YYYY-MM-DD","summary":"..."}]
- ${summaryLevelMap[summaryLevel]}.
- ${options.fineTuning || ''}
`.trim();

  console.log('>>> prompt:', message);

  return message;
};

export { buildPrompt };
