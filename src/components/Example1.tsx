// import { useEffect } from "react";
import { ErrorHandler, ErrorBoundary } from "../errorHandler";
import CustomForm from "./formHandlingError/CustomForm";
import Sample from "./syntaxError/countingIssue/sample";
import ObjectValidationFail from "./apiError/ObjectValidationFail";
import HandleCrashError from "./syntaxError/HandleCrashError";
import Timeout from "./syntaxError/Timeout";
import WithFormik from "./formHandlingError/WithFormik";
import ApiRequestFail from "./apiError/ApiRequestFail";
import HandleApiRespondError from "./apiError/HandleApiRespondError";

const Example1 = (): JSX.Element => {
  return (
    <div className="container py-10">
      <div className="grid grid-cols-3 gap-5 text-left">
        <div className="col-start-1">
          <div className="bg-slate-50 py-6 px-6">
            <ErrorHandler>
              <CustomForm />
            </ErrorHandler>
          </div>
        </div>
        <div className="col">
          <ErrorHandler>
            <HandleCrashError />
          </ErrorHandler>

          <ErrorBoundary>
            <Timeout />
          </ErrorBoundary>

          <ErrorHandler>
            <HandleApiRespondError />
          </ErrorHandler>

          <ErrorHandler>
            <ApiRequestFail />
          </ErrorHandler>

          <ErrorHandler>
            <ObjectValidationFail />
          </ErrorHandler>

          <ErrorHandler>
            <Sample />
          </ErrorHandler>
        </div>

        <div className="col">
          <WithFormik />
        </div>
      </div>
    </div>
  );
};

export default Example1;
