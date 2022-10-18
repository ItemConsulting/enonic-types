# Item Enonic Types – Thymeleaf Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-thymeleaf.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-thymeleaf)

## Installation

Install *@item-enonic-types/lib-thymeleaf* from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-thymeleaf
```

## Usage

To the types for the `"/lib/thymeleaf"`-module, you need to include the following in your *tsconfig.json* :

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