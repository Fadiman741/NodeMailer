const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());
app.use(cors());

// Replace with your actual email configuration
const emailConfig = {
        service: 'Gmail', // Use the email service you want to use
        auth: {
                user: '',
                pass: ''
        }
};

const transporter = nodemailer.createTransport(emailConfig);

app.post('/send-email', (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;


        const mailOptions = {
                from: emailConfig.auth.user,
                to: "",
                subject: 'New Contact Form Submission',
                text: `
                        Name: ${name}
                        Email: ${email}
                        Message: ${message}
                        `
                
        };

        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
                console.error(error);
                res.status(500).json({ message: 'Failed to send email' });
        } else {
                console.log('Email sent:', info.response);
                res.json({ message: 'Email sent successfully' });
        }
        });
});

const port = 3000; // Change this to your desired port number
app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
});