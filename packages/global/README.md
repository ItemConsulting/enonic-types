# Global types for Enonic XP

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Fglobal.svg)](https://badge.fury.io/js/@item-enonic-types%2Fglobal)
![Enonic XP8 badge](https://market.enonic.com/badges/xp8.svg)

Types for Enonic XP that are not covered by the [official types from Enonic](https://www.npmjs.com/org/enonic-types).
Use [`@enonic-types/core`](https://www.npmjs.com/package/@enonic-types/core) for `Request`, `Response` and other core
types.

## Installation

Install _@item-enonic-types/global_ from npm by running:

```bash
npm i --save-dev @item-enonic-types/global
```

## Contents

| Type                                | Description                                                              |
| ----------------------------------- | ------------------------------------------------------------------------ |
| `CustomSelectorServiceParams`       | The parameters a CustomSelector service is always called with            |
| `CustomSelectorServiceResponseBody` | The response body a CustomSelector service must return                   |
| `MacroContext`                      | The context passed to a macro controller                                 |
| `WebSocketResponse`                 | `WebSocketResponse` from `@enonic-types/core`, with a typed `data` field |

## Usage

Import the types you need:

### CustomSelector service

```typescript
import type { Request, Response } from "@enonic-types/core";
import type {
  CustomSelectorServiceParams,
  CustomSelectorServiceResponseBody,
} from "@item-enonic-types/global";

export function GET(
  req: Request<{ params: Partial<CustomSelectorServiceParams> }>,
): Response<{ body: CustomSelectorServiceResponseBody }> {
  return {
    status: 200,
    body: {
      total: 0,
      count: 0,
      hits: [],
    },
  };
}
```

### Macro

```typescript
import type { Response } from "@enonic-types/core";
import type { MacroContext } from "@item-enonic-types/global";

type InfoBoxParams = {
  header: string;
};

export function macro(context: MacroContext<InfoBoxParams>): Response {
  return {
    body: `<aside><h2>${context.params.header}</h2>${context.body}</aside>`,
  };
}
```
