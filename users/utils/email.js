import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';
configDotenv();

const sendEmail = async (option) => {
    //CREATE A TRANSPORTER

//console.log(process.env.EMAIL_HOST)
let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // use TLS
    auth: {
        user: process.env.MAIL, // Your Microsoft email
        pass: process.env.PASSWORD, // Your Microsoft email password
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false // Allow self-signed certificates (for testing)
    },
    debug: true, // Enable debug mode
    logger: true // Log to console
});
//DEFINE EMAIL OPTIONS

const emailOptions = {
    from:'no-reply@gtel.in',
    to:option.email,
    subject:option.subject,
    text:option.message
}

await transporter.sendMail(emailOptions);

}

export default sendEmail;