# COVID-19 Dashboard

> COVID-19 tracking dashboard for the US

## Directory Layout

```
├── /src                         # ReactJS client, which contains most of our UI
│   ├── /components              # React components, reusable across all pages
│   ├── /css                     # Global style definitions
│   ├── /features                # App routes and feature specific code
│   ├── /hooks                   # React hooks
│   └── /utils                   # Client side helper functions/Utilities/Services
└── /public                      # Static assets
```

## Setting up

```bash
npm i
# Run in dev mode
npm run dev
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

API data comes from [The COVID Tracking Project](https://covidtracking.com/)

## Deployment

The site will autodeploy with Cloudflare Pages whenever merged to `main`
