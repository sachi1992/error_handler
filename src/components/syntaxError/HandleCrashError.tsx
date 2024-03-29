import { useErrorBoundary } from "react-error-boundary";
import { CustomError } from "../../errorHandler";

const HandleCrashError = (): JSX.Element => {
  const { showBoundary } = useErrorBoundary();

  return (
    <div className="py-4">
      Syntax Error
      <br />
      <div>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded  "
          onClick={(e) => {
            const error = new CustomError(
              "",
              "Button click with page crashing error"
            );
            showBoundary(error);
          }}>
          Custom Error Object
        </button>
      </div>
    </div>
  );
};

export default HandleCrashError;
