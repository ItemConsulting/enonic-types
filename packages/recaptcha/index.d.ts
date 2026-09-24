/**
 * The reCAPTCHA site key, from the `recaptchaSiteKey` field in the current site's config. Returns an empty string if
 * not configured.
 *
 * Note: Must be called in the context of a site, since it reads the site config.
 */
export function getSiteKey(): string;

/**
 * The reCAPTCHA secret key, from the `recaptchaSecretKey` field in the current site's config. Returns an empty string
 * if not configured.
 *
 * Note: Must be called in the context of a site, since it reads the site config.
 */
export function getSecretKey(): string;

/**
 * Checks with Google if user is verified
 *
 * @param response The reCAPTCHA response token from the client (e.g. the "g-recaptcha-response" form field)
 */
export function verify(response: string | undefined): VerifyResponse;

/**
 * Check if site key and secret key are configured
 */
export function isConfigured(): boolean;

export interface VerifyResponse {
  /**
   * Whether this request was a valid reCAPTCHA token for your site
   */
  success: boolean;

  /**
   * The score for this request (0.0 - 1.0). Only returned for reCAPTCHA v3.
   */
  score?: number;

  /**
   * The action name for this request (important to verify). Only returned for reCAPTCHA v3.
   */
  action?: string;

  /**
   * Timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ). Not returned if the verification failed.
   */
  challenge_ts?: string;

  /**
   * The hostname of the site where the reCAPTCHA was solved. Not returned if the verification failed.
   */
  hostname?: string;

  /**
   * Error codes, e.g. "missing-input-response" or "invalid-input-response"
   */
  "error-codes"?: Array<string>;
}
