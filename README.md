[![Netlify Status](https://api.netlify.com/api/v1/badges/9fbc641f-0c6d-4b3c-9732-791b75f00035/deploy-status)](https://app.netlify.com/sites/covidtracking/deploys)

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
npm start
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

API data comes from [The COVID Tracking Project](https://covidtracking.com/)

## Deployment

The site will autodeplay with Netlify whenever merged to master
