# Enonic XP Nashorn Environment

[![npm version](https://badge.fury.io/js/@item-enonic-types%2Fnashorn-env.svg)](https://badge.fury.io/js/@item-enonic-types%2Fnashorn-env)

Enonic XP 7 *(and 5 and 6)* is using the [Nashorn JavaScript-engine internally](https://docs.oracle.com/javase/10/nashorn/nashorn-java-api.htm).

This library provides TypeScript-types for the APIs exposed by Nashorn, to be used by JavaScript developers.

## Contents

The following global types:

- `Java.type()`
- `Java.to()`
- `Java.extend()`

## Use

To use these global types you need to update the `types` field in your *tsconfig.json* with this library.

```diff
{
  "baseUrl": "./",
  "paths": {
    "/lib/xp/*": ["node_modules/@enonic-types/lib-*"]
  },
+  "types": [
+    "@types/webpack-env"
+    "@item-enonic-types/nashorn-env"
+  ]
}
```

## Example

This is an example of how we can use `java.time.ZonedDateTime` from TypeScript.

For simplicity we just import `DateTimeFormatter` from [`"/lib/time"`](https://github.com/ItemConsulting/lib-xp-time). 
But it is implemented in the same way in that library.

```typescript
import type { DateTimeFormatter } from "/lib/time";

// We use Java.type to grab an instance of java.time.ZonedDateTime
const ZonedDateTime = Java.type<ZonedDateTimeClass>("java.time.ZonedDateTime");

// Now we can use the Java-class like we would in Java
const timeInTwoDays = ZonedDateTime
  .now()
  .plusDays(2)
  .format(DateTimeFormatter.BASIC_ISO_DATE);

// This interface defined the shape of the static java class
interface ZonedDateTimeClass {
  now(): ZonedDateTime;
  parse(text: string): ZonedDateTime;
}

// This instance defines the shape of an instance of the class (the object)
interface ZonedDateTime {
  format(formatter: DateTimeFormatter): string;
  plusDays(days: number): ZonedDateTime;
}
```
