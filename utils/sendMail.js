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
 async function sendMail(receiverAddress){
    console.log(receiverAddress)
    const info = await transporter.sendMail({
        from: 'imageshala123@gmail.com', // sender address
        to: receiverAddress, // list of receivers
        subject: "Thank you for your feedback", 
        html: "<h3>Thank you so much for sharing your feedback with us.</h3>",
      });
}
module.exports=sendMail