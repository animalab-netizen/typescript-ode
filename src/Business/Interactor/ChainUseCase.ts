import { Outputs, type MaybePromise, normalizeOutput, type OutputLike, type OutputOf } from "../DTO/Outputs.js";
import { UseCase } from "./UseCase.js";

export type ChainStep<P, A, R> = (value: A, param: P) => MaybePromise<OutputLike<R>>;

export class ChainUseCase<P, A, R> extends UseCase<P, R> {
  constructor(
    private readonly first: UseCase<P, A>,
    private readonly next: ChainStep<P, A, R>,
  ) {
    super();
  }

  protected override async execute(param: P): Promise<OutputOf<R>> {
    const firstOutput = await this.first.process(param);

    if (firstOutput.kind === "error") {
      return Outputs.error(firstOutput.error);
    }

    if (firstOutput.kind === "empty") {
      return Outputs.empty();
    }

    return normalizeOutput(await this.next(firstOutput.value, param));
  }
}

