# Item Enonic Types – Explorer Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-explorer.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-explorer)

## Installation

Install _@item-enonic-types/lib-explorer_ from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-explorer
```

## Usage

To the types for the `"/lib/explorer"`-module, you need to include the following in your _tsconfig.json_ :

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "/lib/xp/*": ["./node_modules/@enonic-types/lib-*"],
      "/lib/*": [
        "./node_modules/@item-enonic-types/lib-*",
        "./src/main/resources/lib/*"
      ]
    }
  }
}
```
