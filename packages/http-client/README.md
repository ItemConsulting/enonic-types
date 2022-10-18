# Item Enonic Types – Http Client Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-http-client.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-http-client)

## Installation

Install *@item-enonic-types/lib-http-client* from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-http-client
```

## Usage

To the types for the `"/lib/http-client"`-module, you need to include the following in your *tsconfig.json* :

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