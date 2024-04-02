import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

// Initializing Sentry for error tracking and performance monitoring
Sentry.init({
  dsn: "https://91abc073a6fee85d52889b4843c53e9a@o4506942752358400.ingest.us.sentry.io/4506942754062336",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  // integrations: [new Integrations.BrowserTracing()],
  // // integrations: [new Sentry.BrowserTracing()],
  // tracesSampleRate: 1.0,
  // tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
