# Item Enonic Types – Testing Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-testing.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-testing)

## Installation

Install *@item-enonic-types/lib-testing* from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-testing
```

## Usage

To the types for the `"/lib/testing"`-module, you need to include the following in your *tsconfig.json* :

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