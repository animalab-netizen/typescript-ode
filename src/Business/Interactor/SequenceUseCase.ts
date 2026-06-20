import { Outputs, type MaybePromise, normalizeOutput, type OutputLike, type OutputOf } from "../DTO/Outputs.js";
import { UseCase } from "./UseCase.js";

export type SequenceStep<P, R> = (param: P, index: number) => MaybePromise<OutputLike<R>>;

export class SequenceUseCase<P, R> extends UseCase<readonly P[], R[]> {
  constructor(private readonly step: SequenceStep<P, R>) {
    super();
  }

  protected override async execute(params: readonly P[]): Promise<OutputOf<R[]>> {
    const collected: R[] = [];

    for (const [index, param] of params.entries()) {
      const output = normalizeOutput(await this.step(param, index));

      if (output.kind === "error") {
        return Outputs.error(output.error, collected.length > 0 ? collected : undefined);
      }

      if (output.kind === "empty") {
        return Outputs.empty();
      }

      collected.push(output.value);
    }

    return collected.length > 0 ? Outputs.value(collected) : Outputs.empty();
  }
}

