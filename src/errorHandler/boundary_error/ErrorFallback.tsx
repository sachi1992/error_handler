/**
 * ErrorFallback Component
 *
 * This component renders a fallback UI when an error occurs in a React component wrapped with an error boundary.
 * It provides a button to retry the action that caused the error.
 *
 * @component
 * @example
 * // Usage:
 * <ErrorFallback error={error} errorType="formValidation" />
 *
 * @param {Object} props - The component props.
 * @param {any} props.error - The error object.
 * @param {string} [props.errorType] - The type of error.
 * @returns {JSX.Element} A React JSX element representing the error fallback UI.
 */

import { useErrorBoundary } from "react-error-boundary";

type IErrorFallbackProps = {
  error: any;
  errorType?: string;
};

const ErrorFallback = ({
  error,
  errorType,
}: IErrorFallbackProps): JSX.Element => {
  const { resetBoundary } = useErrorBoundary();

  //  const retryAction = useCallback(() => {
  //    // This function will be called when the user clicks "Try again"
  //    // You can define custom retry logic here
  //    // For example, you can retry an API call, reload a component, etc.
  //    console.log('Retrying action...')
  //    // Here, you can add your specific retry logic, for example, you can reload the page
  //    window.location.reload()
  //  }, [])

  // for specific error type check and return custom error component
  // if (errorType === "formValidation") {
  //   return (
  //     <div>
  //       <h2>Something went wrong</h2>
  //       <p>{error.message}</p>
  //       {/* Add additional error handling or instructions here */}
  //     </div>
  //   );
  // }

  return (
    <div>
      <h2>
        <b>Something went wrong {`(${errorType})` ?? ""} </b>
      </h2>

      <p className="text-red-500">{error.message}</p>

      <button className="text-blue-500 font-bolder" onClick={resetBoundary}>
        Try again
      </button>
    </div>
  );
};

export default ErrorFallback;
