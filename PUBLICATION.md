# Publication Guide

## Current State

`typescript-ode` is structured as a standalone npm package.

Current coordinates:

- package: `typescript-ode`
- version: `0.1.0`

## Release Checklist

1. Run `npm run build`
2. Run `npm test`
3. Update `CHANGELOG.md`
4. Confirm version in `package.json`
5. Publish with `npm publish --access public`

## Packaging Notes

- the package ships from `dist/`
- generated types are emitted with the JS bundle
- the runtime has no third-party production dependencies

