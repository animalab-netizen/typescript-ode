# Publication Guide

## Current State

`@animalab-netizen/typescript-ode` is structured as a standalone npm package.

Current coordinates:

- package: `@animalab-netizen/typescript-ode`
- version: `0.2.0`
- npm owner target: `animalab-netizen`
- repository: [github.com/animalab-netizen/typescript-ode](https://github.com/animalab-netizen/typescript-ode)

## Source Repository

- repository: [github.com/animalab-netizen/typescript-ode](https://github.com/animalab-netizen/typescript-ode)
- git url: `https://github.com/animalab-netizen/typescript-ode.git`
- npm package: `@animalab-netizen/typescript-ode`

## Distribution Model

The package is intended for:

- direct npm distribution as the public TypeScript ODE runtime
- consumption by community showcases such as `typescript-ode-consumer`
- installation without any private registry or company-specific domain

## Installation

```bash
npm install @animalab-netizen/typescript-ode
```

## Release Checklist

### GitHub Release Gate

1. Run `npm run build`
2. Run `npm test`
3. Confirm CI is green in `.github/workflows/ci.yml`
4. Update `CHANGELOG.md`
5. Confirm version in `package.json`
6. Commit release metadata
7. Create and push tag `v0.2.0`

### Public Package Gate

1. Confirm npm authentication for owner `animalab-netizen`
2. Confirm the package name remains `@animalab-netizen/typescript-ode`
3. Publish with `npm publish --access public`
4. Verify the package page on npm
5. Validate installation from a clean consumer with `npm install @animalab-netizen/typescript-ode`
6. Publish release notes with install and usage examples

## Packaging Notes

- the package ships from `dist/`
- generated types are emitted with the JS bundle
- the runtime has no third-party production dependencies
- `publishConfig.access` is set to `public`
