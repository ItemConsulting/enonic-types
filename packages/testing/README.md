# Item Enonic Types – Testing Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-testing.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-testing)
![Enonic XP8 badge](https://market.enonic.com/badges/xp8.svg)

## Installation

Install *@item-enonic-types/lib-testing* from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-testing
```

## Usage

To the types for the `"/lib/xp/testing"`-module, you need to include the following in your *tsconfig.json* :

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "/lib/xp/testing": ["./node_modules/@item-enonic-types/lib-testing"],
      "/lib/xp/*": ["./node_modules/@enonic-types/lib-*"],
      "/lib/*": ["./node_modules/@item-enonic-types/lib-*" ,"./src/main/resources/lib/*"]
    }
  }
}
```
