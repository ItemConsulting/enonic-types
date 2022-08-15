# Changelog

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