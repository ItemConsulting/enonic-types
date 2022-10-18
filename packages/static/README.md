# Item Enonic Types – Static Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-static.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-static)

## Installation

Install *@item-enonic-types/lib-static* from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-static
```

## Usage

To the types for the `"/lib/static"`-module, you need to include the following in your *tsconfig.json* :

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