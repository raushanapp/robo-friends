import React from "react";
import ErrorBoundary from "./error-boundary";

export function withErrorBoundary<Props extends object>(
  Component: React.ComponentType<Props>,
): React.FC<Props> {
  const ComponentWithErrorBoundary: React.FC<Props> = (props) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${Component.displayName ?? Component.name ?? "Component"})`;

  return ComponentWithErrorBoundary;
}
