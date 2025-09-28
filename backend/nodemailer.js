// nodemailer-test.js
// A simple script to test your nodemailer setup with GMail using environment variables.

// 1. Import Nodemailer
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// You will need to install this package first:
// npm install nodemailer

// 2. Load credentials from environment variables
// IMPORTANT: Replace 'your.recipient@example.com' with the actual email address
// you want to send the test email to.
const GMAIL_USER = process.env.GMAIL_USER; // Your GMail email address
const GMAIL_PASS = process.env.GMAIL_PASS; // Your GMail App Password
const RECIPIENT_EMAIL = 'cdruye@gmail.com'; 

// Check if credentials are set
if (!GMAIL_USER || !GMAIL_PASS) {
    console.error("Error: GMAIL_USER and GMAIL_PASS environment variables must be set.");
    console.log("Usage: node -r dotenv/config nodemailer-test.js (if using dotenv)");
    console.log("Or: GMAIL_USER=your_email GMAIL_PASS=your_app_password node nodemailer-test.js");
    process.exit(1);
}

// 3. Create a Transporter object using the default SMTP transport
// We use the 'gmail' service shortcut and provided credentials.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS, // NOTE: This must be an App Password, not your regular password!
    },
});

// 4. Define Mail Options (email content)
const mailOptions = {
    from: `"Nodemailer Test" <${GMAIL_USER}>`, // sender address
    to: RECIPIENT_EMAIL, // list of receivers (the fixed address you specified)
    subject: "Nodemailer Test Success! 🎉", // Subject line
    text: "This is a simple test email sent from a Node.js backend using Nodemailer and GMail App Passwords.", // plain text body
    html: "<b>This email confirms that your Nodemailer setup is working correctly!</b><p>You can now integrate this into your backend application.</p>", // HTML body
};

// 5. Send the email
async function sendTestEmail() {
    try {
        console.log(`Attempting to send email from ${GMAIL_USER} to ${RECIPIENT_EMAIL}...`);
        
        // Use await to wait for the email sending process to complete
        const info = await transporter.sendMail(mailOptions);
        
        console.log("-----------------------------------------");
        console.log("✅ Email sent successfully!");
        console.log(`Message ID: ${info.messageId}`);
        console.log(`Preview URL (Ethereal if active): ${nodemailer.getTestMessageUrl(info)}`);
        console.log("-----------------------------------------");

    } catch (error) {
        console.error("-----------------------------------------");
        console.error("❌ Error sending email:");
        // Log the specific error details
        console.error(error.message);
        console.error("-----------------------------------------");
        console.log("Troubleshooting Tips:");
        console.log("1. Ensure 'GMAIL_USER' is your full GMail address.");
        console.log("2. Ensure 'GMAIL_PASS' is a generated App Password (required for security).");
        console.log("3. Verify the 'RECIPIENT_EMAIL' is correct.");
    }
}

// Execute the main function
sendTestEmail();
