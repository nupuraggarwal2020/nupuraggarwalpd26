"use client";

import { ErrorScreen } from "@/components/ErrorScreen";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorScreen
      word="oops"
      message="Something went wrong and the page did not load."
      onRetry={reset}
    />
  );
}
