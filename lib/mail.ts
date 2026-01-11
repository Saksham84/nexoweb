import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendThankYouEmail(email: string, name: string) {
  await transporter.sendMail({
    from: `"NEXOWEB" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thanks for contacting Nexoweb 🚀",
    html: `
      <div style="font-family:Arial,sans-serif">
        <h2>Hi ${name},</h2>
        <p>Thank you for reaching out to <b>NEXOWEB</b>.</p>
        <p>We’ve received your message and will get back to you shortly.</p>
        <br/>
        <p>Best regards,<br/>Nexoweb Team</p>
      </div>
    `,
  });
}
