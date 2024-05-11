const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "imageshala123@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });
 async function sendRegisterMail(receiverAddress,uniqueString){
    console.log(receiverAddress)
    const info = await transporter.sendMail({
        from: 'imageshala123@gmail.com', // sender address
        to: receiverAddress, // list of receivers
        subject: "Email Confirmation", 
        html: `Press <a href=http://localhost:4000/verify/${uniqueString}> here</a> to verify your email`,
      });
}
module.exports=sendRegisterMail