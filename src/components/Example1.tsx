// import { useEffect } from "react";
import { ErrorHandler } from "../errorHandler";
import CustomForm from "./formHandlingError/CustomForm";
import Sample from "./countingIssue/sample";
import HandleApiRespondError from "./apiError/HandleApiRespondError";
import HandleCrashError from "./syntaxError/HandleCrashError";

const Example1 = (): JSX.Element => {
  return (
    <div className="container py-10">
      <div className="grid grid-cols-2 gap-5 text-left">
        <div className="col-start-1">
          <div className="bg-slate-50 py-6 px-6">
            <ErrorHandler>
              <CustomForm />
            </ErrorHandler>
          </div>
        </div>
        <div className="col-start-2">
          <ErrorHandler>
            <HandleCrashError />
          </ErrorHandler>

          <ErrorHandler>
            <HandleApiRespondError />
          </ErrorHandler>

          <ErrorHandler>
            <Sample />
          </ErrorHandler>
        </div>
      </div>
    </div>
  );
};

export default Example1;
