import { Router } from "express";
import nodemailer from "nodemailer";
import sendgrid from "@sendgrid/mail";
import { logger } from "../lib/logger";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const mailRecipient = process.env.MAIL_RECIPIENT || process.env.GMAIL_USER;
  const mailSender = process.env.MAIL_SENDER || process.env.GMAIL_USER;
  const sendgridKey = process.env.SENDGRID_API_KEY;
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!mailRecipient || !mailSender) {
    logger.error({ mailRecipient, mailSender }, "Missing mail sender/recipient configuration");
    return res.status(500).json({ error: "Mail configuration missing on server" });
  }

  const subjectLine = subject?.trim() || `New contact from ${name}`;
  const textBody = `From: ${name} <${email}>

${message}`;
  const htmlBody = `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Message:</strong></p><p>${message}</p>`;

  if (sendgridKey) {
    sendgrid.setApiKey(sendgridKey);

    try {
      const response = await sendgrid.send({
        to: mailRecipient,
        from: mailSender,
        replyTo: email,
        subject: subjectLine,
        text: textBody,
        html: htmlBody,
      });

      logger.info({ provider: "sendgrid", status: response[0].statusCode }, "Contact email sent via SendGrid");
      return res.json({ ok: true });
    } catch (err) {
      logger.error({ err, provider: "sendgrid" }, "SendGrid email failed");
      return res.status(502).json({ error: "Failed to send message via SendGrid" });
    }
  }

  if (!gmailUser || !gmailPass) {
    logger.error(
      { sendgridKey: !!sendgridKey, gmailUser, gmailPass: !!gmailPass },
      "No mail provider configured"
    );
    return res.status(500).json({ error: "Mail provider is not configured" });
  }

  const transportOptionsPrimary = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: gmailPass },
    connectionTimeout: 5_000,
    greetingTimeout: 5_000,
    socketTimeout: 5_000,
  } as const;

  const transportOptionsFallback = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: gmailUser, pass: gmailPass },
    requireTLS: true,
    connectionTimeout: 5_000,
    greetingTimeout: 5_000,
    socketTimeout: 5_000,
  } as const;

  const transports = [transportOptionsPrimary, transportOptionsFallback];
  let lastError: unknown = null;

  for (const opts of transports) {
    const transporter = nodemailer.createTransport(opts as any);
    try {
      const info = await transporter.sendMail({
        from: `${name} <${mailSender}>`,
        to: mailRecipient,
        subject: subjectLine,
        replyTo: email,
        text: textBody,
        html: htmlBody,
      });

      logger.info({ messageId: info.messageId, transportPort: opts.port }, "Contact email sent via Gmail SMTP");
      return res.json({ ok: true });
    } catch (err) {
      lastError = err;
      logger.warn({ err, transportPort: opts.port }, "SMTP transport failed, trying next transport");
    }
  }

  logger.error({ err: lastError }, "All Gmail transports failed to send contact email");
  const errMsg = (lastError && (lastError as any).message) ? (lastError as any).message : "Failed to send message via Gmail SMTP";
  return res.status(502).json({ error: errMsg });
});

export default router;
