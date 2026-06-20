# @animalab-netizen/typescript-ode

`@animalab-netizen/typescript-ode` is the web and server-side counterpart of the ODE architecture style.

The package provides a compact architectural runtime for:

- use case execution
- delivery and result orchestration
- guard-first dispatch flow
- typed output publication
- lightweight MVVM-style channels for viewmodel driven interfaces

The goal is to make application flow easier to standardize, easier to inspect, and less vulnerable to common mistakes around asynchronous delivery, branching orchestration and UI-facing state transitions.

## Repository

- source: [github.com/animalab-netizen/typescript-ode](https://github.com/animalab-netizen/typescript-ode)

## Status

`@animalab-netizen/typescript-ode` is prepared as a standalone publishable package and is intended to be consumed by web examples such as `typescript-ode-consumer`.

The package is maintained by ÂnimaLab and is being positioned as the TypeScript member of the same ODE family already expressed in Kotlin and Swift.

## Coordinates

Current coordinates:

- package: `@animalab-netizen/typescript-ode`
- version: `0.2.0`

Installation:

```bash
npm install @animalab-netizen/typescript-ode
```

## Public API

The intended public surface of `@animalab-netizen/typescript-ode` is centered on these concepts:

- `UseCase<P, R>`
- `UseCaseDispatcher`
- `Output`, `ValueOutput`, `ErrorOutput`, `EmptyOutput`, `Outputs`
- `BaseViewModel`
- `Channel`
- `Controller`
- `ControllerFactory`
- `SequenceUseCase`
- `ChainUseCase`
- `HttpError`, `ConnectionError`, `GuardRejectedError`, `UnexpectedResponseError`

Internal helpers should not be treated as product contract and may change without notice.

## API Stability Notes

Current guidance:

- prefer matching on the explicit `Output` hierarchy instead of treating delivery as raw values and thrown exceptions
- keep guard logic inside the use case instead of distributing pre-validation across views and services
- use `BaseViewModel` channels as explicit delivery surfaces when the package is consumed from UI code
- do not couple application code to internal implementation details of dispatch sequencing

The preferred mental model for delivery handling is:

```ts
switch (output.kind) {
  case "value":
    render(output.value);
    break;
  case "error":
    handleError(output.error);
    break;
  case "empty":
    break;
}
```

## Core Concepts

### 1. UseCase

`UseCase<P, R>` is the main business execution abstraction.

It provides a standard lifecycle for:

- input validation via `guard`
- execution via `execute`
- result normalization via `onResult`
- failure handling via `onError`

This helps teams keep business flow explicit instead of re-implementing orchestration rules in controllers, hooks, or service layers.

### 2. Dispatcher

`UseCaseDispatcher` executes use cases and optionally emits the resulting `Output` to a listener.

This gives consumers a single, predictable way to trigger business work and receive typed delivery.

### 3. Outputs

`@animalab-netizen/typescript-ode` uses an explicit output hierarchy:

- `ValueOutput<T>`
- `ErrorOutput<T>`
- `EmptyOutput`

The `Outputs` helper provides convenient constructors while keeping the final delivery contract typed and readable.

### 4. ChainUseCase

`ChainUseCase` is intended for a two-step flow where the first successful result provides the context for the second step.

This is useful when:

- a first entity must be resolved before comparing or enriching it
- a direct one-shot use case would hide meaningful orchestration

### 5. SequenceUseCase

`SequenceUseCase` is intended for ordered execution across three or more entries.

It keeps the request order explicit in the final delivery, which is especially useful for comparison and showcase scenarios.

### 6. BaseViewModel

`BaseViewModel` provides:

- typed channel creation
- observation registration
- output publication through named channels
- direct use case dispatch into a chosen channel

This is the bridge between business flow and browser or UI-facing consumers when a viewmodel style is preferred.

## Basic Examples

### Direct UseCase

```ts
import { UseCase } from "@animalab-netizen/typescript-ode";

class LoadPokemonUseCase extends UseCase<string, string> {
  protected override async execute(name: string): Promise<string> {
    return `spotlight:${name}`;
  }
}
```

### Guarded UseCase

```ts
import { GuardRejectedError, UseCase } from "@animalab-netizen/typescript-ode";

class ComparePokemonUseCase extends UseCase<{ left: string; right: string }, string> {
  protected override guard(param: { left: string; right: string }) {
    if (!param.left || !param.right || param.left === param.right) {
      return {
        allowed: false,
        error: new GuardRejectedError("Comparison requires two distinct pokemon."),
      };
    }

    return { allowed: true };
  }

  protected override async execute(param: { left: string; right: string }): Promise<string> {
    return `${param.left} vs ${param.right}`;
  }
}
```

### ViewModel Example

```ts
import { BaseViewModel, type OutputOf, UseCase } from "@animalab-netizen/typescript-ode";

class LoadNameUseCase extends UseCase<void, string> {
  protected override async execute(): Promise<string> {
    return "pikachu";
  }
}

class DemoViewModel extends BaseViewModel {
  readonly channel = this.channel<OutputOf<string>>("name");

  async load() {
    await this.dispatchUseCase(undefined, new LoadNameUseCase(), this.channel);
  }
}
```

### Channel Observation

```ts
const viewModel = new DemoViewModel();

const stop = viewModel.observe(viewModel.channel, (output) => {
  if (output.kind === "value") {
    console.log(output.value);
  }
});

await viewModel.load();
stop();
```

## Publishing

Local validation:

```bash
npm run build
npm test
```

Public publication target:

```bash
npm publish --access public
```

See [PUBLICATION.md](/Users/caiosanchezchristino/Desktop/ode-projects/typescript-ode/PUBLICATION.md) for the release checklist and packaging notes.

## Compatibility Notes

The package targets modern TypeScript and ESM-based JavaScript runtimes.

Current assumptions:

- TypeScript 6 for local build and declaration emission
- Node.js 20+ for repository validation
- modern bundlers or ESM-capable runtimes when consumed from apps

If you consume the package from another project, keep your TypeScript and module settings reasonably aligned with the published artifact.

## Contributing

See [CONTRIBUTING.md](/Users/caiosanchezchristino/Desktop/ode-projects/typescript-ode/CONTRIBUTING.md).

## Changelog

See [CHANGELOG.md](/Users/caiosanchezchristino/Desktop/ode-projects/typescript-ode/CHANGELOG.md).

## Maintainer

- name: `ÂnimaLab`
- email: `animalab.desenvolvimento@gmail.com`

## License

This project is licensed under Apache-2.0. See [LICENSE](/Users/caiosanchezchristino/Desktop/ode-projects/typescript-ode/LICENSE).

## UseCase Guide

See [USECASE_GUIDE.md](/Users/caiosanchezchristino/Desktop/ode-projects/typescript-ode/USECASE_GUIDE.md) for combinations, adoption guidance and common implementation doubts.
