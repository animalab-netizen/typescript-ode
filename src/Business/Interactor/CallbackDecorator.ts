import type { OutputOf } from "../DTO/Outputs.js";

export type OutputCallbacks<T> = {
  onValue?: (value: T) => void;
  onError?: (error: unknown) => void;
  onEmpty?: () => void;
};

export function createOutputCallback<T>(callbacks: OutputCallbacks<T>) {
  return (output: OutputOf<T>): void => {
    switch (output.kind) {
      case "value":
        callbacks.onValue?.(output.value);
        return;
      case "error":
        callbacks.onError?.(output.error);
        return;
      case "empty":
        callbacks.onEmpty?.();
        return;
    }
  };
}

