export interface UserMail {
  sendEmailConfirmation(
    email: string,
    first_name: string,
    token: string,
  ): Promise<void>;
  sendPasswordResetEmail(
    email: string,
    name: string,
    token: string,
  ): Promise<void>;
  sendTestEmail(email: string): Promise<void>;
}
