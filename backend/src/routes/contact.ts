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

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });

  try {
    // optional verify (may add a small delay)
    await transporter.verify();

    const info = await transporter.sendMail({
      from: `${name} <${user}>`,
      to: user,
      subject: subject || `New contact from ${name}`,
      replyTo: email,
      text: message,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Message:</strong></p><p>${message}</p>`,
    });

    logger.info({ messageId: info.messageId }, "Contact email sent");
    return res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Error sending contact email");
    return res.status(502).json({ error: "Failed to send message" });
  }
});

export default router;
