import { ReactNode, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ErrorFallback'

type IPropErrorHandler = {
  children: ReactNode
}

export const ErrorHandler = ({ children }: IPropErrorHandler): JSX.Element => {
  const [errorType, setErrorType] = useState<string | null>(null)

  const errorHandler = (error: any, errorInfo: any): void => {
    console.log('🚀 ~~ errorInfo, error', errorInfo, error)

    if (
      Boolean(error.message.includes('is undefined')) ||
      Boolean(error.message.includes('is null'))
    ) {
      setErrorType('nullOrUndefined')
    } else if (error instanceof SyntaxError) {
      setErrorType('syntaxError')
    } else if (
      typeof error.message === 'string' &&
      Boolean(error.message.includes('Type'))
    ) {
      setErrorType('typeError')
    } else if (error.type === 'formValidation') {
      setErrorType('formValidation')
    } else {
      console.error(
        'Error caught by TypeMismatchErrorBoundary:',
        error,
        errorInfo,
        '>>>>>>>>>',
        error.message
      )

      setErrorType('other')
    }
  }

  return (
    <div>
      <ErrorBoundary
        // fallback={<div>Something went wrong</div>} // same function
        FallbackComponent={(err) => (
          <ErrorFallback error={err.error} errorType={errorType ?? ''} />
        )}
        onError={errorHandler}
      >
        {children}
      </ErrorBoundary>
    </div>
  )
}

export default ErrorHandler
