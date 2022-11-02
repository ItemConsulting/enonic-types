# Changelog

## 7.11.0

 > **Note** Enonic has released official types for XP. This library now works as a proxy for those official types, but continues
to provide types for other libraries that there is no official support for yet.

## Changing *tsconfig.json*

> **Warning** Importing types from libraries are broken if you use the old *tsconfig.json*.

If you continue to use the old *tsconfig.json*, importing functions still work, but importing types are now broken.
So we really recommend that you update your *tsconfig.json* to look like the example in [README.md](README.md).

## Upgrading

There are some changes in how the official types are shaped compared to the previous ones. Here are the main ones:

### 1. The shape of `Content` has changed

With 3 type parameters this is the new shape of `Content<Data, Type, Page>`.

Similar to the last version of *enonic-types*, the second type parameter lets the developer set a string literal
that gives the name of the content type. This allows the developer to use `Content.type` as a discriminated union, and
use a simple if-statement to split unions on `type`. 

To give the shape of `Content.x` you have to configure the global `XpXData`.

```typescript
import { get, type Content} from "/lib/xp/content";
import type { Article, Employee } from "../../content-types";

export function all(req: XP.Request): XP.Response {
  const content = get<Content<Article, "myapp:Article"> | Content<Employee, "myapp:Employee">>({ 
    id: req.params.id 
  })!;

  // By checking `Content.type`, we can now know the shape of `Content.data`
  const title = content.type === "myapp:Article"
    ? content.data.title
    : content.data.fullName;
  
  ...
}

// You can configure the shape of XData for all content types in your application once
global {
  interface XpXData {
    "myapp"?: {
      "menu-item"?: {
        menuItem: boolean;
        menuName?: string;
      }
    }
  }
}
```

### 2. `get`, `query` (etc.) takes `Content<Data>` as a type parameter (instead of just `Data`)

```typescript
import { get, query, type Content, type ContentsResult } from "/lib/xp/content";
import type { Article, Employee } from "../../content-types";

export function all(req: XP.Request): XP.Response {
  const article = get<Content<Article>>({ id: req.params.id });
  
  const res = query<Content<Article, "myapp:Article"> | Content<Employee, "myapp:Employee">>({ 
    contentTypes: ["myapp:Article", "myapp:Employee"]
  });
  
  ...
}
```

### 3. `getContent` and `getComponent` from *portalLib* can return `null`

Personally I will be using the `!` ([Non-null assertion operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator))
when using these functions in a *part* or *layout*.

```typescript
import { getContent, getComponent, type Content } from "/lib/xp/portal"; // Note that portalLib also exports `Content`
import type { Article, Employee } from "../../content-types";
import type { ArticleList } from ".";

export function all(): XP.Response {
  const content = getContent<Content<Article>>()!; // getContent() can now return `null`
  const part = getComponent<ArticleList>()!; // getComponent() can now return `null`
  
  ...
}
```

### 4. `Site` takes `<Config>` as a type parameter (again)

You have to pass in the shape of `<Config>` when using `getSiteConfig` or `getSite` from *portalLib*.

```typescript
import { getSiteConfig } from "/lib/xp/portal";

export function all(): XP.Response {
  // If you use "xp-codegen-plugin", you can still use XP.SiteConfig
  const siteConfig = getSiteConfig<XP.SiteConfig>()!;
  
  ...
}
```

### 5. There are some types that has changed names

Many types have the same names in the official types – as they had in this library. But some have gotten new names to
conform better with the official naming in XP.

One example of a type that has changed name is contentLibs `QueryResponse` has now become `ContentsResult`.

There are too many other examples to be able to create an extensive list, so you developers just have to look up the new
names as you need them,

## 0.5.0

New `global` maps are used for registering shapes of Content Types, as well as the shape of `Site.config` and 
`Content.x`.

> **Note**
> If you are using [xp-codegen-plugin@2.0.0](https://github.com/ItemConsulting/xp-codegen-plugin/releases/tag/2.0.0) all
> the `global` declarations mentioned below are automatically generated for you based on the xml-files in your project! :tada:

### ContentType map

The type system can now look up the content types when using `contentLib.query()` with the `contentTypes` parameter set.

For the type system to know about the shape of a content type, we first need to register it. This is done in a global
declaration.

```typescript
export type Article = import("./article").Article
export type Employee = import("./employee").Employee

declare global {
  namespace XP {
    interface ContentTypes {
      "com.mysite:article": Article;
      "com.mysite:employee": Employee;
    }
  }
}
```

This declaration only needs to be done once in your code base, and every `XP.ContentTypes` will now be merged to one
interface.

### Improved type inference + splitting unions with `content.type`

```typescript
import { query } from "/lib/xp/content";

export function get(): XP.Response {
  const res = query({
    count: 100,
    contentTypes: ["com.mysite:article", "com.mysite:employee"]
  });
  
  // the shape of res.hits is correctly inferred based on `contentTypes`
  const contents: Array<Content<Article> | Content<Employee>> = res.hits;
  
  contents.forEach((content) => {
    // since we now know which shape of `data` belongs to which `type` (name), this is possible
    if (content.type === "com.mysite:article") {
      // This would have failed earlier, since `content.type` as of type `string`
      const article: Article = content.data;
      log.info("Article: " + JSON.stringify(article))
    } else {
      // If it isn't an Article, it has to bee an Employee (based on `contentTypes` above)
      const employee: Employee = content.data;
      log.info("Employee: " + JSON.stringify(employee))
    }
  });
}
```

### The shape of `Content` has changed

`XData` has been made a global variable which is now declared in `XP.XData`. This is 
an improvement since `XData` usually has the same shape for all content types (e.g. menu).

The shape of `Content` in *0.4.x* was:

```typescript
export interface Content<Data, XData> {
  ...;
  data: Data;
  x: XData;
}
```

The new shape of `Content` in *0.5.0* is:

```typescript
export interface Content<Data, Type = KeyOfContentType<Data>> {
  ...;
  type: Type;
  data: Data;
  x: XP.XData;
}
```

We can now see that the second type parameter is named `Type` and is a *string literal* with the name of the content
type.

This makes splitting up a discrete union of different content types very easy. We can just use an `if`-statement, to
separate the different content types on the `type` field (the same way we would do it in JavaScript).

## Globally declaring `XP.XData` and `XP.SiteConfig`

The shapes of XData and SiteConfig is no longer passed in as type parameters, but declared globally like this:

```typescript
import { MenuItem } from "../path-to-somewhere";

declare global {
  namespace XP {
    interface SiteConfig {
      footer: string | string[] | undefined;
    }

    interface XData {
      "no-item-www"?: {
        "menu-item"?: MenuItem;
      }
    }
  }
}
```