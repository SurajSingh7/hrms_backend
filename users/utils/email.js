import nodemailer from 'nodemailer';

const sendEmail = async (option) => {
    //CREATE A TRANSPORTER

//console.log(process.env.EMAIL_HOST)
let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // use TLS
    auth: {
        user: 'no-reply@gtel.in', // Your Microsoft email
        pass: 'Wac00935', // Your Microsoft email password
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