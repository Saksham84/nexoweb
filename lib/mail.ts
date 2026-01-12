import nodemailer from "nodemailer";

/**
 * Sanitize user input to prevent HTML / XSS injection
 */
function sanitize(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Admin transporter (receives lead notifications)
 */
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
  tls: {
    rejectUnauthorized: true,
  },
});

/**
 * Client transporter (used to notify you)
 */
export const clientTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CLIENT_USER,
    pass: process.env.CLIENT_PASS,
  },
  secure: true,
  tls: {
    rejectUnauthorized: true,
  },
});

/**
 * Verify transporters on server start (optional but recommended)
 */
transporter.verify((err) => {
  if (err) console.error("❌ EMAIL transporter error:", err);
  else console.log("✅ EMAIL transporter ready");
});

clientTransporter.verify((err) => {
  if (err) console.error("❌ CLIENT transporter error:", err);
  else console.log("✅ CLIENT transporter ready");
});

/**
 * Send admin notification when contact form is submitted
 */
export async function sendContactEmail(
  email: string,
  name: string,
  message: string
) {
  try {
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);

    await clientTransporter.sendMail({
      from: `"NEXOWEB" <${process.env.CLIENT_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🚀 New Contact Form Submission",
      html: `
        <h2>New Lead Received</h2>
        <p><b>Name:</b> ${safeName}</p>
        <p><b>Email:</b> ${safeEmail}</p>
        <p><b>Message:</b></p>
        <p>${safeMessage}</p>
      `,
    });
  } catch (error) {
    console.error("❌ Failed to send contact email:", error);
    throw new Error("Admin email failed");
  }
}

/**
 * Send thank-you email to the user
 */
export async function sendThankYouEmail(email: string, name: string) {
  try {
    const safeName = sanitize(name);

    await transporter.sendMail({
      from: `"NEXOWEB" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for contacting Nexoweb 🚀",
      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>Hi ${safeName},</h2>
          <p>Thank you for reaching out to <b>NEXOWEB</b>.</p>
          <p>We’ve received your message and will get back to you shortly.</p>
          <br/>
          <p>Best regards,<br/>Nexoweb Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("❌ Failed to send thank-you email:", error);
    throw new Error("Thank-you email failed");
  }
}
