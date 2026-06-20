# Publication Guide

## Current State

`typescript-ode` is structured as a standalone npm package.

Current coordinates:

- package: `typescript-ode`
- version: `0.2.0`
- npm owner target: `animalab-netizen`
- repository: [github.com/animalab-netizen/typescript-ode](https://github.com/animalab-netizen/typescript-ode)

## Release Checklist

1. Run `npm run build`
2. Run `npm test`
3. Update `CHANGELOG.md`
4. Confirm version in `package.json`
5. Confirm npm authentication for the intended owner
6. Publish with `npm publish --access public`
7. Verify the package page and installation command from a clean consumer

## Packaging Notes

- the package ships from `dist/`
- generated types are emitted with the JS bundle
- the runtime has no third-party production dependencies
- `publishConfig.access` is set to `public`
