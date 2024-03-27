import "./App.css";
import Example1 from "./components/Example1";
import { ErrorHandler } from "./errorHandler";
import * as Sentry from "@sentry/react";
import { ShowApiError } from "./errorHandler/api_error";

/**
 *
 * Importing ShowApiError component from api_error file
 * Wrapping the entire application with ErrorHandler to catch and handle errors
 */
function App() {
  return (
    <ErrorHandler>
      <div className="App">
        <ShowApiError />

        <Example1 />
      </div>
    </ErrorHandler>
  );
}

export default Sentry.withProfiler(App); // Exporting the App component wrapped with Sentry profiler
