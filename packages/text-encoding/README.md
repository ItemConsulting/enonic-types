# Item Enonic Types – Text-encoding Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-text-encoding.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-text-encoding)

## Installation

Install *@item-enonic-types/lib-text-encoding* from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-text-encoding
```

## Usage

To the types for the `"/lib/text-encoding"`-module, you need to include the following in your *tsconfig.json* :

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