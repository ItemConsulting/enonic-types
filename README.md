# TypeScript types for Enonic XP

This library contains TypeScript types written out for Enonic XP.

## Example

```typescript
import { Request, Response } from "enonic-types/lib/common";
import { ContentLibrary } from "enonic-types/lib/content";

const contentLib: ContentLibrary = __non_webpack_require__("/lib/xp/content");

export function get(req: Request): Response {
  const content = contentLib.get<Article>({ key: req.params.id! });

  if (content !== null) {
    const article: Article = content.data;

    return { status: 200, body: article }
  } else {
    return { status: 404 };
  }
}

interface Article {
  readonly title: string;
  readonly test: string;
}
```
