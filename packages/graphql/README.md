# Item Enonic Types – GraphQL Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-graphql.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-grapql)

## Installation

Install *@item-enonic-types/lib-graphql* from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-graphql
```

## Usage

To the types for the `"/lib/graphql"`-module, you need to include the following in your *tsconfig.json* :

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