const nodemailer = require("nodemailer");

const sendEmail = async (
  to,
  subject,
  html
) => {

  try {

    console.log("Creating transporter...");

    const smtpPort =
      Number(process.env.SMTP_PORT || 465);

    const smtpSecure =
      process.env.SMTP_SECURE
        ? process.env.SMTP_SECURE === "true"
        : smtpPort === 465;

    const transporter =
      nodemailer.createTransport({

        host:
          process.env.SMTP_HOST ||
          "smtp.gmail.com",

        port:
          smtpPort,
        
        secure:
          smtpSecure,

        connectionTimeout: 10000,

        greetingTimeout: 10000,

        socketTimeout: 15000,

        auth: {

          user: process.env.EMAIL_USER,

          pass: process.env.EMAIL_PASS

        },

      });

    console.log("Verifying SMTP...");

    await transporter.verify();

    console.log("SMTP verified");

    console.log(`Sending email to ${to}...`);

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
