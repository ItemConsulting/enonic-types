import { expectType } from "tsd";
import { query, type Content, type MediaImage } from "/lib/xp/content";

interface UnregisteredArticle {
  type: "unregistered";
  title: string;
  body: string;
}

export interface RegisteredArticle {
  type: "registered";
  title: string;
  body: string;
}

declare global {
  namespace XP {
    interface ContentTypes {
      "testsuite:article": RegisteredArticle;
    }

    interface XData {
      myapp: {
        metaDescription: {
          description: "Hello";
        };
      };
    }
  }
}

// Test content
declare const content: Content<UnregisteredArticle>;
expectType<string>(content.type);

// test query for registered type
const queryResult1 = query<RegisteredArticle>({ count: 10 });
expectType<RegisteredArticle>(queryResult1.hits[0].data);
expectType<"testsuite:article">(queryResult1.hits[0].type);
expectType<XP.XData>(queryResult1.hits[0].x);

// test query for registered type
const queryResult2 = query({ count: 10, contentTypes: ["testsuite:article"] });
expectType<RegisteredArticle>(queryResult2.hits[0].data);
expectType<"testsuite:article">(queryResult2.hits[0].type);

// test query for unregistered type
const queryResult3 = query<UnregisteredArticle>({ count: 10 });
expectType<UnregisteredArticle>(queryResult3.hits[0].data);
expectType<string>(queryResult3.hits[0].type);

// test query for unregistered
const queryResult4 = query({ count: 10, contentTypes: ["testsuite:unregisteredArticle"] });
expectType<unknown>(queryResult4.hits[0].data);
expectType<string>(queryResult4.hits[0].type);

const queryResult5 = query({
  count: 100,
  contentTypes: ["testsuite:article", "media:image"],
});
expectType<RegisteredArticle | MediaImage>(queryResult5.hits[0].data);
expectType<"testsuite:article" | "media:image">(queryResult5.hits[0].type);
