# typescript-ode

`typescript-ode` is the web and server-side counterpart of the ODE architecture style.

The package provides a compact runtime for:

- use case execution
- direct, chained and sequence orchestration
- guard-first dispatch flow
- typed output delivery
- lightweight MVVM-style channels for viewmodel driven interfaces

## Repository

- source: [github.com/animalab-netizen/typescript-ode](https://github.com/animalab-netizen/typescript-ode)

## Status

`typescript-ode` is prepared as a standalone publishable package and is intended to be consumed by web examples such as `typescript-ode-consumer`.

## Installation

```bash
npm install typescript-ode
```

## Public API

- `UseCase<P, R>`
- `ChainUseCase<P, A, R>`
- `SequenceUseCase<P, R>`
- `UseCaseDispatcher`
- `Output`, `ValueOutput`, `ErrorOutput`, `EmptyOutput`, `Outputs`
- `BaseViewModel`, `Channel`
- `Controller`, `ControllerFactory`
- `HttpError`, `ConnectionError`, `GuardRejectedError`, `UnexpectedResponseError`

## Example

```ts
import { BaseViewModel, Outputs, UseCase } from "typescript-ode";

class LoadNameUseCase extends UseCase<void, string> {
  protected override async execute(): Promise<string> {
    return "pikachu";
  }
}

class DemoViewModel extends BaseViewModel {
  readonly channel = this.channel("name");

  async load() {
    await this.dispatchUseCase(undefined, new LoadNameUseCase(), this.channel);
  }
}
```

## Publishing

```bash
npm run build
npm test
```

See [PUBLICATION.md](/Users/caiosanchezchristino/Desktop/ode-projects/typescript-ode/PUBLICATION.md).

