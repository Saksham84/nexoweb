import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendContactEmail(email: string, name: string, message: string) {
    await transporter.sendMail({
        from: `"NEXOWEB" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: "🚀 New Contact Form Submission",
        html: `
        <h2>New Lead Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
    `,
    });
}

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
