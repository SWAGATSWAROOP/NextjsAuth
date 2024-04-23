import nodemailer from 'nodemailer';

export const sendEmail = async({email,emailType,userId}:any) => {
    try {
        // TODO : configure mail 
        const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "maddison53@ethereal.email",
            pass: "jn7jnAPss4f63QBp6D",
        },
    });
        const mailOptions = {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: emailType === 'Verify' ? "Verify Your Email" : "Reset Your Password", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        }
        
        const mailres = await transporter.sendMail(mailOptions);
        return mailres
    } catch (error:any) {
        throw new Error(error.message);
    }
}