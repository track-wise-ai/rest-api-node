export interface GoogleCalendar {
  id: string;
  summary: string;
}

export interface EventDateTime {
  dateTime?: string;
  date?: string;
}

export interface GoogleEvent {
  id: string;
  eventType: string;
  start: EventDateTime;
  end: EventDateTime;
  summary: string;
  description: string;
}
