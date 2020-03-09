export interface RecaptchaLibrary {
  getSiteKey(): string;
  getSecretKey(): string;
  verify(res: any): boolean;
  isConfigured(): boolean;
}
