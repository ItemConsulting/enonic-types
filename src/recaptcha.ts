declare module "*/lib/recaptcha" {
  namespace recaptchaLib {
    interface RecaptchaLibrary {
      getSiteKey(): string;

      getSecretKey(): string;

      verify(res: string): VerifyResponse;

      isConfigured(): boolean;
    }

    export interface VerifyResponse {
      /**
       * Whether this request was a valid reCAPTCHA token for your site
       */
      success: boolean;

      /**
       * The score for this request (0.0 - 1.0)
       */
      score: number;

      /**
       * the action name for this request (important to verify)
       */
      action: string;

      /**
       * Timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
       */
      challenge_ts: string;

      /**
       * The hostname of the site where the reCAPTCHA was solved
       */
      hostname: string;

      /**
       * Error codes
       */
      errorcodes?: Array<string>;
    }
  }
  const recaptchaLib: recaptchaLib.RecaptchaLibrary;
  export = recaptchaLib;
}
