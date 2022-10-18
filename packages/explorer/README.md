# Item Enonic Types – Explorer Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-explorer.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-explorer)

## Installation

Install *@item-enonic-types/lib-explorer* from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-explorer
```

## Usage

To the types for the `"/lib/explorer"`-module, you need to include the following in your *tsconfig.json* :

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