export interface EnonicLibraryMap {
  "/lib/xp/admin": import("./admin").AdminLibrary;
  "/lib/xp/auth": import("./auth").AuthLibrary;
  "/lib/xp/cluster": import("./cluster").ClusterLibrary;
  "/lib/xp/common": import("./common").CommonLibrary;
  "/lib/xp/content": import("./content").ContentLibrary;
  "/lib/xp/context": import("./context").ContextLibrary;
  "/lib/text-encoding": import("./encoding").EncodingLibrary;
  "/lib/xp/event": import("./event").EventLibrary;
  "/lib/http-client": import("./http").HttpLibrary;
  "/lib/xp/i18n": import("./i18n").I18nLibrary;
  "/lib/xp/io": import("./io").IOLibrary;
  "/lib/xp/mail": import("./mail").MailLibrary;
  "/lib/menu": import("./menu").MenuLibrary;
  "/lib/xp/node": import("./node").NodeLibrary;
  "/lib/xp/portal": import("./portal").PortalLibrary;
  "/lib/xp/project": import("./project").ProjectLibrary;
  "/lib/recaptcha": import("./recaptcha").RecaptchaLibrary;
  "/lib/xp/repo": import("./repo").RepoLibrary;
  "/lib/router": import("./router").RouterLib;
  "/lib/session": import("./session").SessionLibrary;
  "/lib/xp/task": import("./task").TaskLibrary;
  "/lib/xp/testing": import("./testing").TestingLibrary;
  "/lib/thymeleaf": import("./thymeleaf").ThymeleafLibrary;
  "/lib/xp/value": import("./value").ValueLibrary;
  "/lib/xp/websocket": import("./websocket").WebsocketLibrary;
}
