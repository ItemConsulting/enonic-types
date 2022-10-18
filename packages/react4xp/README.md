# Item Enonic Types – React4XP Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-react4xp.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-react4xp)

## Installation

Install *@item-enonic-types/lib-react4xp* from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-react4xp
```

## Usage

To the types for the `"/lib/enonic/react4xp"`-module, you need to include the following in your *tsconfig.json* :

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "/lib/xp/*": ["./node_modules/@enonic-types/lib-*"],
      "/lib/enonic/*": ["./node_modules/@item-enonic-types/lib-*"],
      "/lib/*": ["./node_modules/@item-enonic-types/lib-*" ,"./src/main/resources/lib/*"]
    }
  }
}
```