const nodemailer = require("nodemailer");
const dns = require("dns");

if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder("ipv4first");
}

const sendEmail = async (
  to,
  subject,
  html
) => {

  try {

    console.log("Creating transporter...");

    const smtpPort =
      Number(process.env.SMTP_PORT || 465);

    const smtpHost =
      process.env.SMTP_HOST ||
      "smtp.gmail.com";

    const smtpSecure =
      process.env.SMTP_SECURE
        ? process.env.SMTP_SECURE === "true"
        : smtpPort === 465;

    const smtpFamily =
      Number(process.env.SMTP_FAMILY || 4);

    let connectionHost =
      smtpHost;

    if (smtpFamily === 4) {
      const addresses =
        await dns.promises.resolve4(
          smtpHost
        );

      connectionHost =
        addresses[0];
    }

    console.log(
      `SMTP config: host=${smtpHost}, connectionHost=${connectionHost}, port=${smtpPort}, secure=${smtpSecure}, family=${smtpFamily}`
    );

    const transporter =
      nodemailer.createTransport({

        host:
          connectionHost,

        port:
          smtpPort,
        
        secure:
          smtpSecure,

        family:
          smtpFamily,

        connectionTimeout: 10000,

        greetingTimeout: 10000,

        socketTimeout: 15000,

        auth: {

          user: process.env.EMAIL_USER,

          pass: process.env.EMAIL_PASS

        },

        tls: {
          servername:
            smtpHost
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
