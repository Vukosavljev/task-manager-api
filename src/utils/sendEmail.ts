import { SendEmailParams } from '@types';
import nodemailer from 'nodemailer';

export const sendEmail = async ({ subject, html, to }: SendEmailParams) => {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM_USER_NAME,
    SMTP_FROM_USER_EMAIL,
  } = process.env;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: +SMTP_PORT,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const message = {
    from: `${SMTP_FROM_USER_NAME} <${SMTP_FROM_USER_EMAIL}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(message);
};
