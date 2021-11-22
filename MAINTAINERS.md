# Releasing

This package automatically tracks the [`expect`](https://www.npmjs.com/package/expect) package for updates, so it typically does not require manual releases.

In case you want to do a manual release, make it a **prerelease**, otherwise you will end up preventing the next automatic release. Then, after publishing that as the `latest` version, also publish it under the `@storybook/jest` tag.

```
npm version prerelease
npm dist-tag add @storybook/expect@$(npm view @storybook/expect version) @storybook/jest
```

The dist tag is used by the [@storybook/jest](https://www.npmjs.com/package/@storybook/jest) package.
