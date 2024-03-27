/**
 * Component for error handling in React applications.
 * It wraps its children with an ErrorBoundary component and provides a centralized
 * way to handle errors that occur within them.
 * @param children The child components to be wrapped.
 */
import { ReactNode, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";

type IPropErrorHandler = {
  children: ReactNode;
};

export const ErrorHandler = ({ children }: IPropErrorHandler): JSX.Element => {
  const [errorType, setErrorType] = useState<string | null>(null);

  /**
   * Function to handle errors and categorize them based on their characteristics.
   * @param error The error object.
   * @param errorInfo Additional information about the error.
   */
  const errorHandler = (error: any, errorInfo: any): void => {
    if (
      Boolean(error.message.includes("is undefined")) ||
      Boolean(error.message.includes("is null"))
    ) {
      setErrorType("nullOrUndefined");
    } else if (error instanceof SyntaxError) {
      setErrorType("syntaxError");
    } else if (
      typeof error.message === "string" &&
      Boolean(error.message.includes("Type"))
    ) {
      setErrorType("typeError");
    } else if (error.type === "formValidation") {
      setErrorType("formValidation");
    } else {
      setErrorType("other");
    }
  };

  useEffect(() => {
    // hide webpack-dev-server-client-overlay
    window.addEventListener("error", (e) => {
      const resizeObserverErrDiv = document.getElementById(
        "webpack-dev-server-client-overlay-div"
      );
      const resizeObserverErr = document.getElementById(
        "webpack-dev-server-client-overlay"
      );

      if (resizeObserverErr) {
        resizeObserverErr.style.display = "none";
      }

      if (resizeObserverErrDiv) {
        resizeObserverErrDiv.style.display = "none";
      }
    });
  }, []);

  return (
    <ErrorBoundary
      FallbackComponent={(err) => (
        <ErrorFallback error={err.error} errorType={errorType ?? ""} />
      )}
      onError={errorHandler}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorHandler;
