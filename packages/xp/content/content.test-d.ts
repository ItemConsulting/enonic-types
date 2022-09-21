import { expectType } from "tsd";
import { get, query, type Content, type MediaImage, create } from ".";

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

const getResult1 = get({ key: "1" });
expectType<Content | null>(getResult1);
expectType<Record<string, unknown>>(getResult1!.data);

const getResult2 = get<RegisteredArticle>({ key: "1" });
expectType<Content<RegisteredArticle, "testsuite:article"> | null>(getResult2);

const getResult3 = get<UnregisteredArticle>({ key: "1" });
expectType<Content<UnregisteredArticle, string> | null>(getResult3);

const getResult4 = get<RegisteredArticle | UnregisteredArticle>({ key: "1" });
expectType<Content<RegisteredArticle, "testsuite:article"> | Content<UnregisteredArticle, string> | null>(getResult4);

const createResult1 = create({
  name: "asdf",
  contentType: "notregistered:myarticle",
  data: {
    title: "blub",
  },
  parentPath: "/mypath",
  // TODO Remove idGenerator after next release
  idGenerator: (a) => a + "1",
});

expectType<Content<{ title: string }, "notregistered:myarticle">>(createResult1);

const createResult2 = create({
  name: "asdf",
  contentType: "testsuite:article",
  data: {
    type: "registered",
    body: "eu",
    title: "asdf",
  },
  parentPath: "/mypath",
  // TODO Remove idGenerator after next release
  idGenerator: (a) => a + "1",
});

expectType<Content<RegisteredArticle, "testsuite:article">>(createResult2);
