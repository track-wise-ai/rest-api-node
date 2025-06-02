### Routes

```
/api/v1
├── /ping (GET)           - helth check
├── /auth
│	├── /login (POST)       - auth user
│	└── /signup (POST)      - create new user
├── /settings (GET, POST) - fetch/save settings
├── /google			
│   ├── /events (GET)     - fetch calendar events
│   ├── /calendars (GET)  - fetch calendar list
│   ├── /auth-link (GET)  - get auth url
│   └── /callback (GET)   - callback for google auth 
├── ai (POST)             - generate summary with ai
└── jira/track-log (POST) - save worklog in Jira
```
