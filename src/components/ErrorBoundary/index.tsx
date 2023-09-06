import Link from "next/link";
import React, { Component, ErrorInfo, ReactNode } from "react";

import styles from "./ErrorBoundary.module.scss";
import Translate from "../commons/Translate";

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
        <div className={styles["center"]}>
          <div className={styles["error"]}>
            <div className={styles["number"]}>4</div>
            <div className={styles["illustration"]}>
              <div className={styles["circle"]}></div>
              <div className={styles["clip"]}>
                <div className={styles["paper"]}>
                  <div className={styles["face"]}>
                    <div className={styles["eyes"]}>
                      <div className={styles["eye eye-left"]}></div>
                      <div className={styles["eye eye-right"]}></div>
                    </div>
                    <div className={styles["rosyCheeks rosyCheeks-left"]}></div>
                    <div
                      className={styles["rosyCheeks rosyCheeks-right"]}
                    ></div>
                    <div className={styles["mouth"]}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["number"]}>5</div>
          </div>
          <Link href="/" prefetch={false} className={styles["button"]}>
            <Translate textKey="home" />
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
