import { ErrorHandler } from "../errorHandler";
import Form1 from "./formExample/Form1";
import NestedForm from "./formExample/NestedForm";

const Example2 = (): JSX.Element => {
  return (
    <div className="container py-10">
      <div className="grid grid-cols-3 gap-5 text-left">
        <div className="col">
          <ErrorHandler>
            <Form1 />
          </ErrorHandler>
        </div>
        <div className="col">
          <ErrorHandler>
            <NestedForm />
          </ErrorHandler>
        </div>
      </div>
    </div>
  );
};

export default Example2;
