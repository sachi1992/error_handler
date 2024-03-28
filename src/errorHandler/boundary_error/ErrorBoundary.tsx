import { Component, ErrorInfo, ReactNode } from "react";

type ErrorBoundaryProps = {
  fallback?: ReactNode;
  children: ReactNode; // Explicitly include children prop
};

type ErrorBoundaryState = {
  hasError: boolean;
  hasUndefinedOrNullError: boolean;
  hasSyntaxError: boolean;
  hasTypeMismatch: boolean;
  error: any;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      hasUndefinedOrNullError: false,
      hasSyntaxError: false,
      hasTypeMismatch: false,
      error: {},
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (
      error.message.includes("is undefined") ||
      error.message.includes("is null")
    ) {
      // If the error is related to undefined or null values, set the state to indicate the error
      this.setState({ hasUndefinedOrNullError: true });
    } else if (error instanceof SyntaxError) {
      // If the error is a SyntaxError, set the state to indicate a syntax error
      this.setState({ hasSyntaxError: true });
    } else if (error.message.includes("Type")) {
      // If the error is a type mismatch, set the state to indicate a type mismatch
      this.setState({ hasTypeMismatch: true });
    } else {
      // If it's another type of error, log it
      this.setState({ hasError: true });
    }
  }

  static getDerivedStateFromError(_error: Error): { hasError: boolean } {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <div>Oops! There was a syntax error.</div>;
    }

    if (this.state.hasSyntaxError) {
      // Render a fallback UI for syntax errors
      return <div>Oops! There was a syntax error.</div>;
    }

    if (this.state.hasTypeMismatch) {
      // Render a fallback UI for type mismatches
      return <div>Oops! There was a type mismatch.</div>;
    }

    if (this.state.hasUndefinedOrNullError) {
      // Render a fallback UI for undefined or null value errors
      return <div>Oops! An undefined or null value error occurred.</div>;
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
