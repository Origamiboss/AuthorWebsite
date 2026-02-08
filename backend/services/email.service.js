import nodemailer from 'nodemailer';

let transporter;

// Initialize transporter once
async function initTransporter() {
    if (transporter) return transporter; // already initialized

    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    return transporter;
}

export async function sendVerificationEmail(email, token) {
    const transporter = await initTransporter();

    const info = await transporter.sendMail({
        from: '"Author Website" <no-reply@author.com>',
        to: email,
        subject: 'Confirm your email',
        html: `
      <p>Please confirm your email:</p>
      <a href="http://localhost:5000/api/newsletter/confirm?token=${token}">
        Confirm Email
      </a>
    `,
    });

    console.log('Preview URL:', nodemailer.getTestMessageUrl(info)); // important for test emails!
}
