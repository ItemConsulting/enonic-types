# Item Enonic Types – Guillotine Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-guillotine.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-guillotine)

## Installation

Install *@item-enonic-types/lib-guillotine* from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-guillotine
```

## Usage

To the types for the `"/lib/guillotine"`-module, you need to include the following in your *tsconfig.json* :

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