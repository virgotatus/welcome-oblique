interface EmailProps {
  name: string;
  email: string;
  message: string;
}

async function sendEmail({ name, email, message }: EmailProps) {
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    host: "smtp.163.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: `"Fred Foo 👻" <${process.env.EMAIL_FROM}>"`, // sender address
    to: `"${email} "`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `"${name}, Welcome"`, // plain text body
    html: `"<b>${message}</b>"`, // html body
  });
  return info;
}

export default sendEmail;
