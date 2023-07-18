import React, { Component, ErrorInfo, ReactNode } from "react";

import MainLayout from "~layouts/MainLayout";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <MainLayout>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Sorry, something went wrong!
          </p>
        </MainLayout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;