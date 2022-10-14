# Releasing

This package automatically tracks the [`expect`](https://www.npmjs.com/package/expect) package for updates, so it typically does not require manual releases.

In case you want to do a manual release, make it a **prerelease**, otherwise you will end up preventing the next automatic release. A prerelease looks like this: `28.1.3-0` (note the dash followed by a number).

After publishing that as the `latest` version, also publish it under the `storybook-jest` tag.

Here are the commands:

```bash
## Generate a new prerelease version and git tag, e.g. 28.1.3-0, tag v28.1.3-0
npm version prerelease

## Publish the new version to npm with `latest` tag
npm publish

## Publish the new version to npm as `storybook-jest`
npm dist-tag add @storybook/expect@`npm view @storybook/expect version` storybook-jest
```

The `storybook-jest` dist tag is used by the [@storybook/jest](https://www.npmjs.com/package/@storybook/jest) package, so there is no need to update that package manually.

## Making a canary release

Sometimes you might want to release an experiment before it is merged into the main branch. For that, you can do the same steps as before, but defining the releases as `canary`. 

**⚠️ Do not forget the canary flags, else you will end up with experimental changes on a `latest` release.**

```bash
npm version prerelease --preid=canary
npm publish --tag=canary
```

### Testing canary releases

This package is not used directly by users. It's used via the `@storybook/jest` package, which depends on `@storybook/expect`. As we publish a new version of `@storybook/expect`, the `@storybook/jest` package is always in line with that new version because of its npm tag. This means that in order to test a canary release, you will have to use yarn resolution/package overrides in the `package.json` of your project, for instance:

```json
{
  "resolutions": {
    "@storybook/expect": "28.1.4-canary.0"
  }
}
```

## What if I make a mistake when generating a version before releasing

If there was a mistake when running `npm version`, make sure to undo it by executing:

```
## Undo the commit that changed package.json
git reset --hard HEAD~1

## Delete the newly generated tag e.g. v28.1.3-0
git tag -d v{the-version-number-here}
```
