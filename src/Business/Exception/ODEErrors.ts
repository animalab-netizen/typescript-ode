export class ODEError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = new.target.name;
  }
}

export class GuardRejectedError extends ODEError {}

export class HttpError extends ODEError {
  constructor(
    public readonly status: number,
    public readonly url: string,
    message = `HTTP ${status} while loading ${url}`,
  ) {
    super(message);
  }
}

export class ConnectionError extends ODEError {
  constructor(
    public readonly url: string,
    message = `Unable to reach ${url}`,
  ) {
    super(message);
  }
}

export class UnexpectedResponseError extends ODEError {}

