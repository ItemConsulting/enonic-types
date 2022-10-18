# Item Enonic Types – Router Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-router.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-router)

## Installation

Install *@item-enonic-types/lib-router* from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-router
```

## Usage

To the types for the `"/lib/router"`-module, you need to include the following in your *tsconfig.json* :

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