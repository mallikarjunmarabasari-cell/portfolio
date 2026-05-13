import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#0a0a0a;color:#e8e8e8;border-radius:12px;">
          <h2 style="margin:0 0 4px;color:#18FFB0;font-size:20px;">New message from your portfolio</h2>
          <p style="margin:0 0 24px;color:#555;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;">via mallikarjun.dev</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#888;font-size:13px;width:80px;">From</td><td style="padding:8px 0;font-size:13px;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#888;font-size:13px;">Email</td><td style="padding:8px 0;font-size:13px;"><a href="mailto:${email}" style="color:#18FFB0;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#888;font-size:13px;">Subject</td><td style="padding:8px 0;font-size:13px;">${subject}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #1a1a1a;margin:20px 0;" />
          <p style="font-size:14px;line-height:1.7;color:#ccc;white-space:pre-wrap;">${message}</p>
        </div>
      `,
    });

    req.log.info({ from: email }, "Contact email sent");
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

export default router;
