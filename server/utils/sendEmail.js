const nodemailer = require("nodemailer");

const sendEmail = async (
  to,
  subject,
  html
) => {

  try {

    console.log("Creating transporter...");

    const transporter =
      nodemailer.createTransport({

        host: "smtp.gmail.com",

        port: 587,
        
        secure: false,

        auth: {

          user: process.env.EMAIL_USER,

          pass: process.env.EMAIL_PASS

        },

        tls: {

          rejectUnauthorized: false

        }

      });

    console.log("Verifying SMTP...");

    await transporter.verify();

    console.log("SMTP verified");

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to,

      subject,

      html

    });

    console.log("Email sent");

  } catch (error) {

    console.log("EMAIL ERROR:");
    console.log(error);

    throw error;

  }

};

module.exports =
  sendEmail;