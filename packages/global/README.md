# Global types for Enonic XP

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Fglobal.svg)](https://badge.fury.io/js/@item-enonic-types%2Fglobal)

> **Note** There is also an [official package for Global types for XP](https://www.npmjs.com/package/@enonic-types/global).

This library provides backwards compatibility for the old [enonic-types](https://www.npmjs.com/package/enonic-types) package
while moving to the [new types provided by Enonic](https://www.npmjs.com/org/enonic-types).

## Contents

The following global types:

- `XP.Request`
  - `XP.ErrorRequest`
  - `XP.CustomSelectorServiceParams`
- `XP.Response`
  - `XP.WebSocketResponse`
  - `XP.CustomSelectorServiceResponseBody`
  - `XP.CustomSelectorServiceResponseHit`
- `XP.MacroContext`
- `XP.WebSocketEvent`

## Use

To use these global types you need to update the `types` field in your *tsconfig.json* with this library.

```diff
{
  "baseUrl": "./",
  "paths": {
    "/lib/xp/*": ["node_modules/@enonic-types/lib-*"]
  },
+  "types": [
+    "@item-enonic-types/global"
+  ]
}
```
