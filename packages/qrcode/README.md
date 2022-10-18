# Item Enonic Types – QRCode Lib

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Flib-qrcode.svg)](https://badge.fury.io/js/@item-enonic-types%2Flib-qrcode)

## Installation

Install *@item-enonic-types/lib-qrcode* from npm by running:

```bash
npm i --save-dev @item-enonic-types/lib-qrcode
```

## Usage

To the types for the `"/lib/qrcode"`-module, you need to include the following in your *tsconfig.json* :

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