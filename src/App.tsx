import "./App.css";
import Example1 from "./components/Example1";
import { ErrorHandler } from "./errorHandler";
import * as Sentry from "@sentry/react";
import { ShowApiError } from "./errorHandler/api_error";

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

export default Sentry.withProfiler(App);
