// emailService.d.ts

declare module "emailService" {
    export function sendEmail(
      userEmail: string,
      userName: string,
      doctorName: string,
      date: string,
      time: string
    ): Promise<boolean>;
  }
  