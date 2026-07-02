"use client";

import { Component, type ReactNode } from "react";
import Link from "next/link";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Parallels error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/8 border border-accent/20">
              <span className="text-2xl text-accent">✦</span>
            </div>
            <h2 className="mb-2 text-xl font-bold text-text-primary font-display">Something went wrong</h2>
            <p className="mb-6 max-w-md text-sm text-text-muted">
              An unexpected error occurred. Please try refreshing the page or navigating back.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-primary hover:bg-bg-tertiary transition-colors"
              >
                Try again
              </button>
              <Link
                href="/"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-void hover:bg-accent-hover transition-colors"
              >
                Go home
              </Link>
            </div>
            {this.state.error && (
              <p className="mt-6 max-w-lg text-xs text-text-muted/50 font-mono break-all">
                {this.state.error.message}
              </p>
            )}
          </div>
        )
      );
    }

    return this.props.children;
  }
}
