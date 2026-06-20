import type { OutputOf } from "../../Business/DTO/Outputs.js";
import type { UseCase } from "../../Business/Interactor/UseCase.js";
import { UseCaseDispatcher } from "../../Business/Interactor/UseCaseDispatcher.js";

export class Channel<T> {
  constructor(public readonly name: string) {}
}

type Observer<T> = (value: T) => void;

export class BaseViewModel {
  private readonly observers = new Map<string, Set<Observer<unknown>>>();
  private readonly dispatcher = new UseCaseDispatcher();

  channel<T>(name: string): Channel<T> {
    return new Channel<T>(name);
  }

  observe<T>(channel: Channel<T>, observer: Observer<T>): () => void {
    const set = this.observers.get(channel.name) ?? new Set<Observer<unknown>>();
    set.add(observer as Observer<unknown>);
    this.observers.set(channel.name, set);

    return () => {
      const current = this.observers.get(channel.name);
      current?.delete(observer as Observer<unknown>);
      if (current && current.size === 0) {
        this.observers.delete(channel.name);
      }
    };
  }

  postValue<T>(channel: Channel<T>, value: T): void {
    const current = this.observers.get(channel.name);
    current?.forEach((observer) => {
      observer(value);
    });
  }

  async dispatchUseCase<P, R>(
    param: P,
    useCase: UseCase<P, R>,
    channel: Channel<OutputOf<R>>,
  ): Promise<OutputOf<R>> {
    const output = await this.dispatcher.dispatch(param, useCase);
    this.postValue(channel, output);
    return output;
  }

  clearObservers(): void {
    this.observers.clear();
  }
}

