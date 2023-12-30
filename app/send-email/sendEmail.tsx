import { Resend } from "resend";
import { AIResult } from "../api/route";
import LingWelcomeEmail from "@/emails/LingWelcome";
import LingSchoolEmail from "@/emails/LingSchool";

export const RESEND_INS = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(res: AIResult) {
  const sended = await RESEND_INS.emails.send({
    from: "Elon@灵感炼丹炉 <email@ideaplayer.shop>",
    to: `${res.query.username} <${res.query.email}>`,
    bcc: "bob<bob@q24.io>",
    subject: "一份灵感彩蛋",
    react: LingSchoolEmail(res),
    reply_to: "gong435491723@gmail.com",
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
  return sended.data;
}

export default sendEmail;
