import { AiGenerateEventDto } from '../../dto';

const formatEvents = (event: AiGenerateEventDto) => ({
  start: event.start.dateTime || event.start.date,
  end: event?.end?.dateTime || event?.end?.date,
  summary: event?.summary || '',
  ...(event?.description ? { description: event.description } : {}),
});

export { formatEvents };
