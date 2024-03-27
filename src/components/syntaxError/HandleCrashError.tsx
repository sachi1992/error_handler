import { useErrorBoundary } from "react-error-boundary";
import { CustomError } from "../../errorHandler";

const HandleCrashError = (): JSX.Element => {
  const { showBoundary } = useErrorBoundary();

  return (
    <div>
      Syntax and Timeout Error
      <button
        onClick={(e) => {
          const error = new CustomError(
            "",
            "Button click with page crashing error"
          );
          showBoundary(error);
        }}>
        Custom Error Object
      </button>
      <button
        onClick={(e) => {
          setTimeout(() => {
            throw new Error("Time out with page crashing error");
          }, 2);
        }}>
        Timeout Error
      </button>
    </div>
  );
};

export default HandleCrashError;
