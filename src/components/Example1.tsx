import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import { ErrorHandler, CustomError } from "../errorHandler";
import CustomForm from "./CustomForm";
// import { useErrorBoundary } from "react-error-boundary";

const Example1 = (): JSX.Element => {
  // const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    // sentry
    setTimeout(() => {
      const error = new CustomError("formValidation", "crash Example1 page");
      // showBoundary(error);
      throw new Error("crash Example1 page");
    }, 2);
  }, []);

  return (
    <ErrorHandler>
      <div className="container">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-start-1">
            <div>Sentry Error Handler</div>
            <div>
              <CustomForm />
            </div>
          </div>
        </div>
      </div>
    </ErrorHandler>
  );
};

export default Sentry.withProfiler(Example1);
