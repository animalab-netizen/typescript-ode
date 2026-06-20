import type { OutputOf } from "../../Business/DTO/Outputs.js";

export type OutputHandlingStrategy<T> = {
  onValue: (value: T) => void;
  onError: (error: unknown) => void;
  onEmpty?: () => void;
};

export function handleOutput<T>(
  output: OutputOf<T>,
  strategy: OutputHandlingStrategy<T>,
): void {
  switch (output.kind) {
    case "value":
      strategy.onValue(output.value);
      return;
    case "error":
      strategy.onError(output.error);
      return;
    case "empty":
      strategy.onEmpty?.();
      return;
  }
}

