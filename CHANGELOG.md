# Changelog

## Enonic XP 8

The packages have been updated for the XP 8 versions of the libraries, and now depend on `@enonic-types/core@^8.0.0`
where needed. Each package follows the version of the library it provides types for.

### Removed packages

 * **`enonic-types`** is deprecated. Install the individual `@enonic-types/*` and `@item-enonic-types/*` packages you
   need instead.
 * **`@item-enonic-types/lib-cron`**, **`lib-graphql`**, **`lib-mustache`** and **`lib-notifications`** are replaced by
   the official [`@enonic-types/lib-cron`](https://www.npmjs.com/package/@enonic-types/lib-cron),
   [`@enonic-types/lib-graphql`](https://www.npmjs.com/package/@enonic-types/lib-graphql),
   [`@enonic-types/lib-mustache`](https://www.npmjs.com/package/@enonic-types/lib-mustache) and
   [`@enonic-types/lib-notifications`](https://www.npmjs.com/package/@enonic-types/lib-notifications).
 * **`@item-enonic-types/lib-testing`** is removed.

### Breaking changes

#### `@item-enonic-types/lib-menu` 5.0.0

 * `MenuItem.displayName` and `MenuItem.menuName` are removed, since they were never returned by the library. Use
   `MenuItem.title`, which contains the `menuName` from the "menu-item" mixin, falling back to the `displayName`.
 * `url` on breadcrumb items (`BreadcrumbMenuItem`) is now optional. It is not set on the active item, unless
   `linkActiveItem` is `true`.

#### `@item-enonic-types/lib-http-client` 4.0.0

 * `HttpResponse.headers` values are now `string | string[] | undefined`. Headers with multiple values (e.g.
   "set-cookie") are returned as an array.
 * `HttpResponse.contentType` is now `string | null`. It is `null` if the response has no "content-type" header.

```typescript
const response = request({ url: "https://example.com" });

const setCookie = response.headers["set-cookie"];
const cookies = Array.isArray(setCookie) ? setCookie : setCookie ? [setCookie] : [];
```

#### `@item-enonic-types/lib-recaptcha` 4.0.0

 * `VerifyResponse.score` and `VerifyResponse.action` are now optional, since they are only returned for reCAPTCHA v3.
 * `VerifyResponse.challenge_ts` and `VerifyResponse.hostname` are now optional, since they are not returned if the
   verification failed.

```typescript
const result = verify(req.params["g-recaptcha-response"]);
const isHuman = result.success && (result.score ?? 0) > 0.5;
```

### Other changes

 * **lib-cache 3.0.0:** `size` and `expire` in `NewCacheParams` are now optional.
 * **lib-http-client 4.0.0:** Added `HttpResponse.cookies`. `params` and `queryParams` also accept `number`, `boolean`
   and `null` values.
 * **lib-qrcode 3.0.1:** `GenerateQrCodeParams` is exported.
 * **lib-router 4.0.0:** Added `patch()`. All route functions accept an array of patterns.
 * **lib-sql 2.0.0:** `SqlConnectParams`, `SqlHandler` and `SQLQueryResult` are exported. `query()` and `queryFirst()`
   default to `Record<string, unknown>` rows.
 * **lib-text-encoding 3.0.0:** Added `md5AsStream()`, `sha1AsStream()`, `sha256AsStream()` and `sha512AsStream()`.
   Encode and hash functions also accept `number` and `boolean` values.
 * **lib-thymeleaf 3.0.0:** `mode` in `ThymeleafRenderOptions` is now optional.
 * **lib-xslt 3.0.0:** The `model` parameter of `render()` is now optional.
 * All the packages above have JSDoc comments on every function and field.

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