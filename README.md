# babel-transform-runtime-module-resolution-issue

This repo demonstrates the issue with module resolution when one needs to transpile a package from `node_modules`.

## Development commands

- `npm run build` to build application's source code.

## The issue details

Say, you are building a frontend project, client-side bundle needs to follow ECMAScript 5. One of you `node_module` dependencies - `react-redux`, in this example - needs to be [transpiled](/webpack.config.js#L20) to ES5. At the same time, both `react-redux` and current repository rely on the same production dependency - `react-is` - though on different versions:

```sh
> npm ls react-is
babel-transform-runtime-module-resolution-issue@0.0.1
├── react-is@16.13.1
└─┬ react-redux@8.0.5
  ├─┬ hoist-non-react-statics@3.3.2
  │ └── react-is@16.13.1 deduped
  └── react-is@18.2.0
```

Moreover, say, there is a reason you are not able to use the same dependency version.

Now, if you try to build the project (via `NODE_ENV=production npm run build`) you'll get the following warning:

```sh
WARNING in ./node_modules/react-redux/es/components/connect.js 228:8-25
export 'isContextConsumer' (imported as 'isContextConsumer') was not found in 'react-is' (possible exports: __esModule)
 @ ./node_modules/react-redux/es/index.js 9:0-57 11:0-17
 @ ./src/index.js 1:0-37 2:24-29
```

As a result, output bundle is broken.

## Workarounds

I managed to find two possible workarounds:

### Use the same dependency version

Update and use the same version of `react-is`. Check the behavior by running the build command on `use-the-same-version` branch ([diff](../../compare/use-the-same-version)):

```sh
git checkout use-the-same-version
NODE_ENV=production npm run build
```

### Remove `plugin-transform-runtime` plugin

Remove `@babel/plugin-transform-runtime` plugin from babel preset. Check the behavior by running the build command on `without-plugin` branch ([diff](../../compare/without-plugin)):

```sh
git checkout without-plugin
NODE_ENV=production npm run build
```
