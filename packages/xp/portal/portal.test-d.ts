import { expectType } from "tsd";
import { getSiteConfig, getSite } from "./index";

declare global {
  namespace XP {
    interface SiteConfig {
      isSiteConfig: true;
    }
  }
}

expectType<{ isSiteConfig: true }>(getSiteConfig());
expectType<{ isSiteConfig: true }>(forceArray(getSite().data.siteConfig)[0].config);

export function forceArray<A>(data: A | Array<A> | undefined): ReadonlyArray<A> {
  data = data || [];
  return Array.isArray(data) ? data : [data];
}
