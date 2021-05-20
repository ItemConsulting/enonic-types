import { QRCodeLibrary } from "./qr";

export interface EnonicLibraryMap {
  "/lib/xp/admin": import("./admin").AdminLibrary;
  "/lib/xp/auth": import("./auth").AuthLibrary;
  "/lib/cache": import("./cache").CacheLibrary;
  "/lib/xp/cluster": import("./cluster").ClusterLibrary;
  "/lib/xp/common": import("./common").CommonLibrary;
  "/lib/xp/content": import("./content").ContentLibrary;
  "/lib/xp/context": import("./context").ContextLibrary;
  "/lib/cron": import("./cron").CronLibrary;
  "/lib/text-encoding": import("./encoding").EncodingLibrary;
  "/lib/xp/event": import("./event").EventLibrary;
  "/lib/tineikt/freemarker": import("./freemarker").FreeMarkerLibrary;
  "/lib/http-client": import("./http").HttpLibrary;
  "/lib/xp/i18n": import("./i18n").I18nLibrary;
  "/lib/xp/io": import("./io").IOLibrary;
  "/lib/xp/mail": import("./mail").MailLibrary;
  "/lib/menu": import("./menu").MenuLibrary;
  "/lib/mustache": import("./mustache").MustacheLibrary;
  "/lib/xp/node": import("./node").NodeLibrary;
  "/lib/notifications": import("./notifications").NotificationsLibrary;
  "/lib/xp/portal": import("./portal").PortalLibrary;
  "/lib/xp/project": import("./project").ProjectLibrary;
  "/lib/qrcode": import("./qr").QRCodeLibrary;
  "/lib/recaptcha": import("./recaptcha").RecaptchaLibrary;
  "/lib/xp/repo": import("./repo").RepoLibrary;
  "/lib/router": import("./router").RouterLib;
  "/lib/session": import("./session").SessionLibrary;
  "/lib/enonic/static": import("./static").StaticLibrary;
  "/lib/xp/task": import("./task").TaskLibrary;
  "/lib/xp/testing": import("./testing").TestingLibrary;
  "/lib/thymeleaf": import("./thymeleaf").ThymeleafLibrary;
  "/lib/turbo-streams": import("./turbo").TurboStreamsLibrary;
  "/lib/xp/value": import("./value").ValueLibrary;
  "/lib/xp/websocket": import("./websocket").WebsocketLibrary;
  "/lib/xslt": import("./xslt").XsltLibrary;
}
