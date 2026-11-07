import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { escapeHtml } from '../utils/sanitize.js';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD,
  },
});

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Sends a notification email to the configured receiver.
 * All user inputs are HTML-escaped before embedding.
 * 
 * @returns true if sent successfully, false otherwise.
 * Failures are logged but never thrown — the DB submission is preserved regardless.
 */
export async function sendContactNotification(data: ContactEmailData): Promise<boolean> {
  try {
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeSubject = escapeHtml(data.subject);
    const safeMessage = escapeHtml(data.message);

    const htmlBody = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f0b; border: 1px solid rgba(68, 255, 153, 0.15); border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, rgba(68, 255, 153, 0.12), rgba(77, 255, 131, 0.06)); padding: 32px 24px; border-bottom: 1px solid rgba(68, 255, 153, 0.1);">
          <h1 style="margin: 0; color: #44ff99; font-size: 20px; font-weight: 600;">New Contact Submission</h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.5); font-size: 13px;">Portfolio Contact Form</p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; color: rgba(255,255,255,0.5); font-size: 13px; vertical-align: top; width: 80px;">Name</td>
              <td style="padding: 12px 0; color: #ffffff; font-size: 14px;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: rgba(255,255,255,0.5); font-size: 13px; vertical-align: top; border-top: 1px solid rgba(255,255,255,0.06);">Email</td>
              <td style="padding: 12px 0; color: #44ff99; font-size: 14px; border-top: 1px solid rgba(255,255,255,0.06);"><a href="mailto:${safeEmail}" style="color: #44ff99; text-decoration: none;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: rgba(255,255,255,0.5); font-size: 13px; vertical-align: top; border-top: 1px solid rgba(255,255,255,0.06);">Subject</td>
              <td style="padding: 12px 0; color: #ffffff; font-size: 14px; border-top: 1px solid rgba(255,255,255,0.06);">${safeSubject}</td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px;">
            <p style="margin: 0 0 8px; color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
            <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
        <div style="padding: 16px 24px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
          <p style="margin: 0; color: rgba(255,255,255,0.3); font-size: 11px;">Sent from your portfolio contact form</p>
        </div>
      </div>
    `;

    const textBody = [
      'New Contact Submission',
      '=====================',
      '',
      `Name:    ${data.name}`,
      `Email:   ${data.email}`,
      `Subject: ${data.subject}`,
      '',
      'Message:',
      data.message,
    ].join('\n');

    await transporter.sendMail({
      from: `"Portfolio Contact" <${env.SMTP_USERNAME}>`,
      to: env.CONTACT_RECEIVER_EMAIL,
      subject: `Portfolio Contact: ${data.subject}`,
      text: textBody,
      html: htmlBody,
    });

    console.log('[Email] Notification sent successfully.');
    return true;
  } catch (error) {
    console.error('[Email] Failed to send notification:', error instanceof Error ? error.message : error);
    return false;
  }
}
