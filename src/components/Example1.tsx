import { useEffect } from "react";
import { ErrorHandler } from "../errorHandler";
import CustomForm from "./formHandlingError/CustomForm";
import Sample from "./countingIssue/sample";
import HandleApiRespondError from "../errorHandler/api_error/HandleApiRespondError";

const Example1 = (): JSX.Element => {
  return (
    <ErrorHandler>
      <div className="container">
        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="col-start-1">
            <div className="bg-slate-50 py-6 px-6">
              <ErrorHandler>
                <CustomForm />
              </ErrorHandler>
            </div>
          </div>
          <div className="col-start-2">
            <div>
              Show API Error Message
              <HandleApiRespondError />
            </div>

            <div>
              Show Page Crashing Error
              <Sample />
            </div>
          </div>
        </div>
      </div>
    </ErrorHandler>
  );
};

export default Example1;
