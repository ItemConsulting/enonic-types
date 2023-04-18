/**
 * The reCAPTCHA site key
 */
export function getSiteKey(): string;

/**
 * The reCAPTCHA secret key
 */
export function getSecretKey(): string;

/**
 * Checks with Google if user is verified
 */
export function verify(res: string | undefined): VerifyResponse;

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
  "error-codes"?: Array<string>;
}
