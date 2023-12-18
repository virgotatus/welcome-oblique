import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
interface EmailProps {
  name: string;
  email: string;
  message: string;
}

async function sendEmail({ name, email, message }: EmailProps) {
  const result = await resend.emails.send({
    from: "Elon <email@ideaplayer.shop>",
    to: [`${name} <${email}>`],
    subject: "炼丹",
    text: `${message}`,
    attachments: [
      {
        filename: "invoice.pdf",
        content: "sadasasdasd",
      },
    ],
    headers: {
      "X-Entity-Ref-ID": "123456789",
    },
    tags: [
      {
        name: "category",
        value: "confirm_email",
      },
    ],
  });
  // by smtp:
  // const transporter = NodeFilter.createTransport({
  //   host: "smtp.163.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
  //     user: process.env.EMAIL_SERVER_USER,
  //     pass: process.env.EMAIL_SERVER_PASSWORD,
  //   },
  // });
  // const info = await transporter.sendMail({
  //   from: `"Fred Foo 👻" <${process.env.EMAIL_FROM}>"`, // sender address
  //   to: `"${email} "`, // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: `"${name}, Welcome"`, // plain text body
  //   html: `"<b>${message}</b>"`, // html body
  // });
  return result.data;
}

export default sendEmail;
