import type { OutputOf } from "../DTO/Outputs.js";
import type { UseCase } from "./UseCase.js";

export type DispatchListener<R> = (output: OutputOf<R>) => void;

export class UseCaseDispatcher {
  async dispatch<P, R>(
    param: P,
    useCase: UseCase<P, R>,
    listener?: DispatchListener<R>,
  ): Promise<OutputOf<R>> {
    const output = await useCase.process(param);
    listener?.(output);
    return output;
  }
}

