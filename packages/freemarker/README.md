# Item Enonic Types – Tine IKT Freemarker Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-freemarker.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-freemarker)

## Installation

Install *@item-enonic-types/lib-freemarker* from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-freemarker
```

## Usage

To the types for the `"/lib/tineikt/freemarker"`-module, you need to include the following in your *tsconfig.json* :

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "/lib/tineikt/freemarker": ["./node_modules/@item-enonic-types/lib-freemarker"]
    }
  }
}
```