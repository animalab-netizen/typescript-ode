import { Outputs, type MaybePromise, normalizeOutput, type OutputLike, type OutputOf } from "../DTO/Outputs.js";

export type GuardResult =
  | { allowed: true }
  | { allowed: false; error?: unknown };

export abstract class UseCase<P, R> {
  protected guard(_param: P): MaybePromise<GuardResult> {
    return { allowed: true };
  }

  protected abstract execute(param: P): MaybePromise<OutputLike<R>>;

  protected onResult(output: OutputOf<R>): MaybePromise<OutputLike<R>> {
    return output;
  }

  protected onError(error: unknown): MaybePromise<OutputLike<R>> {
    return Outputs.error(error);
  }

  protected onGuardError(error?: unknown): MaybePromise<OutputLike<R>> {
    return error ? Outputs.error(error) : Outputs.empty();
  }

  async process(param: P): Promise<OutputOf<R>> {
    try {
      const guardResult = await this.guard(param);

      if (!guardResult.allowed) {
        return normalizeOutput(await this.onGuardError(guardResult.error));
      }

      const output = normalizeOutput(await this.execute(param));
      return normalizeOutput(await this.onResult(output));
    } catch (error) {
      return normalizeOutput(await this.onError(error));
    }
  }
}

