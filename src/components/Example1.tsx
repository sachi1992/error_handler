import { useEffect } from "react";
import { ErrorHandler } from "../errorHandler";
import CustomForm from "./formHandlingError/CustomForm";
import Sample from "./countingIssue/sample";
import HandleApiRespondError from "../errorHandler/api_error/HandleApiRespondError";

const Example1 = (): JSX.Element => {
  return (
    <ErrorHandler>
      <div className="container">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-start-1">
            <div>
              Show API Error Message
              <HandleApiRespondError />
            </div>

            <div>
              Show Page Crashing Error
              <Sample />
            </div>

            <div>
              Show Form Validation Error
              <CustomForm />
            </div>
          </div>
        </div>
      </div>
    </ErrorHandler>
  );
};

export default Example1;
