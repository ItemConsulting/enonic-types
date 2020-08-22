export interface EnonicLibraryMap {
  "/lib/xp/auth": import("./lib/auth").AuthLibrary;
  "/lib/xp/common": import("./lib/common").CommonLibrary;
  "/lib/xp/content": import("./lib/content").ContentLibrary;
  "/lib/xp/context": import("./lib/context").ContextLibrary;
  "/lib/text-encoding": import("./lib/encoding").EncodingLibrary;
  "/lib/xp/event": import("./lib/event").EventLibrary;
  "/lib/http-client": import("./lib/http").HttpLibrary;
  "/lib/xp/i18n": import("./lib/i18n").I18nLibrary;
  "/lib/xp/io": import("./lib/io").IOLibrary;
  "/lib/xp/mail": import("./lib/mail").MailLibrary;
  "/lib/menu": import("./lib/menu").MenuLibrary;
  "/lib/xp/node": import("./lib/node").NodeLibrary;
  "/lib/xp/portal": import("./lib/portal").PortalLibrary;
  "/lib/recaptcha": import("./lib/recaptcha").RecaptchaLibrary;
  "/lib/xp/repo": import("./lib/repo").RepoLibrary;
  "/lib/router": import("./lib/router").RouterLib;
  "/lib/session": import("./lib/session").SessionLibrary;
  "/lib/xp/thymeleaf": import("./lib/thymeleaf").ThymeleafLibrary;
  "/lib/xp/value": import("./lib/value").ValueLibrary;
}
