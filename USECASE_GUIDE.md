# UseCase Guide

## Direct

Use a regular `UseCase` when one request produces one delivery.

## Chain

Use `ChainUseCase` when a first result determines the second step, typically for two-entity comparisons.

## Sequence

Use `SequenceUseCase` when you need ordered execution across three or more entries.

## Guard

Use `guard` in `UseCase` when a request must be validated before any I/O happens.

