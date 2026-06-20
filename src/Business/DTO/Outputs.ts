export type MaybePromise<T> = T | Promise<T>;

export abstract class Output<T> {
  abstract readonly kind: "value" | "error" | "empty";

  get hasValue(): boolean {
    return this.kind === "value";
  }

  get isError(): boolean {
    return this.kind === "error";
  }

  get isEmpty(): boolean {
    return this.kind === "empty";
  }
}

export class ValueOutput<T> extends Output<T> {
  readonly kind = "value" as const;

  constructor(public readonly value: T) {
    super();
  }
}

export class ErrorOutput<T = never> extends Output<T> {
  readonly kind = "error" as const;

  constructor(
    public readonly error: unknown,
    public readonly value?: T,
  ) {
    super();
  }
}

export class EmptyOutput extends Output<never> {
  readonly kind = "empty" as const;
}

export type OutputLike<T> = OutputOf<T> | T | null | undefined;
export type OutputOf<T> = ValueOutput<T> | ErrorOutput<T> | EmptyOutput;

export const Outputs = {
  value<T>(value: T): ValueOutput<T> {
    return new ValueOutput(value);
  },
  error<T = never>(error: unknown, value?: T): ErrorOutput<T> {
    return new ErrorOutput(error, value);
  },
  empty(): EmptyOutput {
    return new EmptyOutput();
  },
};

export function normalizeOutput<T>(value: OutputLike<T>): OutputOf<T> {
  if (value instanceof Output) {
    return value;
  }

  if (value === null || value === undefined) {
    return Outputs.empty();
  }

  return Outputs.value(value);
}

export function isValueOutput<T>(output: OutputOf<T>): output is ValueOutput<T> {
  return output.kind === "value";
}

export function isErrorOutput<T>(output: OutputOf<T>): output is ErrorOutput<T> {
  return output.kind === "error";
}

export function isEmptyOutput<T>(output: OutputOf<T>): output is EmptyOutput {
  return output.kind === "empty";
}

