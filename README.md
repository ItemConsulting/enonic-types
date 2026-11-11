# TypeScript types for Enonic XP

![Enonic XP8 badge](https://market.enonic.com/badges/xp8.svg)

> [!NOTE]
> Always use the [official TypeScript-types](https://www.npmjs.com/org/enonic-types) from Enonic if they exist.
> The new purpose of this library is to provide types for all the libraries that doesn't have official support yet.

## Supported libraries

 * [ExplorerLibrary](https://www.npmjs.com/package/@item-enonic-types/lib-explorer)
 * [TestingLibrary](https://www.npmjs.com/package/@item-enonic-types/lib-testing)

You can also find some global types in these two libraries

 * [Global library](https://www.npmjs.com/package/@item-enonic-types/global) (Types for Custom Selectors)
 * [Nashorn Env.](https://www.npmjs.com/package/@item-enonic-types/nashorn-env)

## Installing individual packages

You can install individual packages with support for Enonic libraries like this:

You can find the [complete list of supported packages on npm](https://www.npmjs.com/org/item-enonic-types).

```bash
npm i --save-dev @item-enonic-types/global
npm i --save-dev @item-enonic-types/lib-testing
```

## Update tsconfig.json

We recommend using [starter-ts](https://github.com/enonic/starter-ts) as the base of your XP-project.

To add the TypeScript-types you need to update your *src/main/resources/tsconfig.json* with the following:

```json
{
  "include": [
    "**/*.ts"
  ],

  "exclude": [
    "**/*.d.ts",
    "assets/**/*.*"
  ],

  "compilerOptions": {
    "target": "ES2015",
    "lib": [
      "ES5"
    ],

    "rootDirs": [".", "../../../.xp-codegen"],

    "paths": {
      "/lib/xp/*": ["../../../node_modules/@enonic-types/lib-*"],
      "/lib/*": ["./lib/*", "../../../node_modules/@enonic-types/lib-*", "../../../node_modules/@item-enonic-types/lib-*"],
      "/*": ["./*", "../../../.xp-codegen/*"]
    },

    "skipLibCheck": true,
  }
}
```

## Code generation

We recommend using this library together with the [xp-codegen-plugin](https://github.com/ItemConsulting/xp-codegen-plugin) Gradle plugin. *xp-codegen-plugin* will create a TypeScript `type` for your content-types. Those interfaces will be very useful together with this library.
