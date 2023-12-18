import { Resend } from "resend";

export const RESEND_INS = new Resend(process.env.RESEND_API_KEY);
interface EmailProps {
  name: string;
  email: string;
  message: string;
}

async function sendEmail({ name, email, message }: EmailProps) {
  const result = await RESEND_INS.emails.send({
    from: "Elon <email@ideaplayer.shop>",
    to: [`${name} <${email}>`],
    subject: "Welcome to Ling.School",
    text: `${message}`,
    // attachments: [
    //   {
    //     filename: "invoice.pdf",
    //     content: "text",
    //   },
    // ],
    headers: {
      "X-Entity-Ref-ID": "123456789",
    },
    tags: [
      {
        name: "category",
        value: "register_email",
      },
      {
        name: "project",
        value: "ling_school",
      },
    ],
  });
  return result.data;
}

export default sendEmail;
