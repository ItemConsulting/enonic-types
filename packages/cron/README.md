# Item Enonic Types – Cron Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-cron.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-cron)

## Installation

Install *@item-enonic-types/lib-cron* from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-cron
```

## Usage

To the types for the `"/lib/cron"`-module, you need to include the following in your *tsconfig.json* :

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