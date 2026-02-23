import nodemailer from "nodemailer";

/*
    Email transporter
*/
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


/*
    Send Contact Message
*/
export const sendContactMessage = async (req, res) => {
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
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
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