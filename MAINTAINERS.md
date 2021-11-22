# Releasing

This package automatically tracks the [`expect`](https://www.npmjs.com/package/expect) package for updates, so it typically does not require manual releases.

In case you want to do a manual release, make it a **prerelease**:

```
npm version prerelease
```

Otherwise you will end up preventing the next automatic release.

Then, after publishing that as the `latest` version, also publish it under the `@storybook/jest` tag:

```
npm dist-tag add @storybook/expect@... @storybook/jest
```

Replace the `...` with the prerelease version you just published.

This tag is used by the [@storybook/jest](https://www.npmjs.com/package/@storybook/jest) package.
