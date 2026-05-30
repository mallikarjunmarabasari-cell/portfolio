import { Router } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    logger.error({ user, pass: !!pass }, "Missing Gmail credentials");
    return res.status(500).json({ error: "Mail configuration missing on server" });
  }

  // Create two transporters: primary (465, secure) and fallback (587, STARTTLS)
  const transportOptionsPrimary = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 5_000,
    greetingTimeout: 5_000,
    socketTimeout: 5_000,
  } as const;

  const transportOptionsFallback = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
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
        from: `${name} <${user}>`,
        to: user,
        subject: subject || `New contact from ${name}`,
        replyTo: email,
        text: message,
        html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Message:</strong></p><p>${message}</p>`,
      });

      logger.info({ messageId: info.messageId, transportPort: opts.port }, "Contact email sent");
      return res.json({ ok: true });
    } catch (err) {
      lastError = err;
      // Log and try next transport option
      logger.warn({ err, transportPort: opts.port }, "Sending failed, trying next transport");
    }
  }

  // If we reach here, all transports failed
  logger.error({ err: lastError }, "All transports failed to send contact email");
  // Provide non-sensitive error info to the client
  const errMsg = (lastError && (lastError as any).message) ? (lastError as any).message : "Failed to send message";
  return res.status(502).json({ error: errMsg });
});

export default router;
