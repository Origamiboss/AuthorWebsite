import nodemailer from "nodemailer";

/*
    Email transporter
*/
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


/*
    Send Contact Message
*/
export const sendContactMessage = async (req, res) => {
    console.log("Received contact message:", req.body);
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Email options
        const mailOptions = {
            from: `"Contact Form" <${process.env.USER_EMAIL}>`,
            to: process.env.USER_EMAIL,
            replyTo: email,
            subject: `New Contact Message from ${name}`,
            text: `
            Name: ${name}
            Email: ${email}

            Message:
            ${message}
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Contact message sent:", nodemailer.getTestMessageUrl(mailOptions));
        return res.json({
            success: true,
            message: "Message sent successfully",
        });

    } catch (error) {
        console.error("Contact Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to send message",
        });
    }
};