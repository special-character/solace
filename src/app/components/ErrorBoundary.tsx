import { useState, ReactNode } from "react";

const ErrorBoundary = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<Error | null>(null);

  try {
    if (error) throw error;
    return children;
  } catch (err) {
    return (
      <div>
        <h2>Something went wrong</h2>
        <p>{(err as Error).message}</p>
        <button onClick={() => setError(null)}>Try Again</button>
      </div>
    );
  }
};

export default ErrorBoundary;
