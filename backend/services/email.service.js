import nodemailer from 'nodemailer';

const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass,
    },
});

export async function sendVerificationEmail(email, token) {
    await transporter.sendMail({
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
}
