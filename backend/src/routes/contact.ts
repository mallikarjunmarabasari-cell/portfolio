import { Router } from "express";
import dns from "dns";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const mailRecipient = process.env.MAIL_RECIPIENT || process.env.GMAIL_USER;
  const mailSender = process.env.MAIL_SENDER || process.env.GMAIL_USER;
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!mailRecipient || !mailSender) {
    logger.error({ mailRecipient, mailSender }, "Missing mail sender/recipient configuration");
    return res.status(500).json({ error: "Mail configuration missing on server" });
  }

  if (!gmailUser || !gmailPass) {
    logger.error({ gmailUser, gmailPass: !!gmailPass }, "Gmail SMTP is not configured");
    return res.status(500).json({ error: "Gmail SMTP credentials are not configured" });
  }

  const subjectLine = subject?.trim() || `New contact from ${name}`;
  const textBody = `From: ${name} <${email}>

${message}`;
  const htmlBody = `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Message:</strong></p><p>${message}</p>`;

  const smtpHost = await dns.promises
    .lookup("smtp.gmail.com", { family: 4 })
    .then((result) => result.address)
    .catch((err) => {
      logger.warn({ err }, "Unable to resolve smtp.gmail.com to IPv4; falling back to host name");
      return "smtp.gmail.com";
    });

  const transportOptionsPrimary = {
    host: smtpHost,
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: gmailPass },
    tls: { servername: "smtp.gmail.com" },
    connectionTimeout: 5_000,
    greetingTimeout: 5_000,
    socketTimeout: 5_000,
  } as const;

  const transportOptionsFallback = {
    host: smtpHost,
    port: 587,
    secure: false,
    auth: { user: gmailUser, pass: gmailPass },
    requireTLS: true,
    tls: { servername: "smtp.gmail.com" },
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
