import { useErrorBoundary } from 'react-error-boundary'

import { useEffect } from 'react'
// import { handleToastMessage } from 'utilities'

type IErrorFallbackProps = {
  error: any
  errorType?: string
  // resetErrorBoundary: any
}

const ErrorFallback = ({
  error,
  errorType
  // resetErrorBoundary
}: IErrorFallbackProps): JSX.Element => {
  const { resetBoundary } = useErrorBoundary()

  //   same function

  //  const retryAction = useCallback(() => {
  //    // This function will be called when the user clicks "Try again"
  //    // You can define custom retry logic here
  //    // For example, you can retry an API call, reload a component, etc.
  //    console.log('Retrying action...')
  //    // Here, you can add your specific retry logic, for example, you can reload the page
  //    window.location.reload()
  //  }, [])

  useEffect(() => {
    // if (error !== null || error !== '') {
    //  page crash handler
    window.addEventListener('error', (e) => {
      if (e.type === 'error') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        )
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        )
        if (resizeObserverErr !== null) {
          resizeObserverErr.setAttribute('style', 'display: none')
        }
        if (resizeObserverErrDiv !== null) {
          resizeObserverErrDiv.setAttribute('style', 'display: none')
        }
      }
    })
    // }
  }, [])

  if (errorType === 'formValidation') {
    // handleToastMessage(error.message, 'error')
    return (
      <div>
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
        {/* Add additional error handling or instructions here */}
      </div>
    )
  }

  return (
    <div>
      <h2>
        <b>Something went wrong {errorType ?? ''} </b>
      </h2>

      <p style={{ color: 'red' }}>{error.message}</p>

      <button
        onClick={
          // resetErrorBoundary
          resetBoundary
        }
      >
        Try again
      </button>
    </div>
  )
}

export default ErrorFallback
