import test from "node:test";
import assert from "node:assert/strict";
import {
  ChainUseCase,
  GuardRejectedError,
  Outputs,
  SequenceUseCase,
  UseCase,
} from "../dist/index.js";

class EchoUseCase extends UseCase {
  async execute(param) {
    return `echo:${param}`;
  }
}

class GuardedUseCase extends UseCase {
  guard(param) {
    return param ? { allowed: true } : { allowed: false, error: new GuardRejectedError("missing param") };
  }

  async execute(param) {
    return param.toUpperCase();
  }
}

test("direct use case normalizes raw values", async () => {
  const output = await new EchoUseCase().process("pikachu");
  assert.equal(output.kind, "value");
  assert.equal(output.value, "echo:pikachu");
});

test("guarded use case blocks invalid requests", async () => {
  const output = await new GuardedUseCase().process("");
  assert.equal(output.kind, "error");
  assert.ok(output.error instanceof GuardRejectedError);
});

test("chain use case maps first result into second story", async () => {
  const first = new EchoUseCase();
  const chained = new ChainUseCase(first, async (value) => Outputs.value(`${value}:story`));
  const output = await chained.process("bulbasaur");

  assert.equal(output.kind, "value");
  assert.equal(output.value, "echo:bulbasaur:story");
});

test("sequence use case preserves ordered entries", async () => {
  const sequence = new SequenceUseCase(async (value) => value.toUpperCase());
  const output = await sequence.process(["bulbasaur", "charmander", "squirtle"]);

  assert.equal(output.kind, "value");
  assert.deepEqual(output.value, ["BULBASAUR", "CHARMANDER", "SQUIRTLE"]);
});

