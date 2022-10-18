# Item Enonic Types – GraphQL Playground Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-graphql-playground.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-grapql-playground)

## Installation

Install *@item-enonic-types/lib-graphql-playgrond* from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-graphql-playground
```

## Usage

To the types for the `"/lib/graphql-playground"`-module, you need to include the following in your *tsconfig.json*:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "/lib/xp/*": ["./node_modules/@enonic-types/lib-*"],
      "/lib/*": ["./node_modules/@item-enonic-types/lib-*" ,"./src/main/resources/lib/*"]
    }
  }
}
```