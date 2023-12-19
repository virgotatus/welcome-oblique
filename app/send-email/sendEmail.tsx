import { Resend } from "resend";
import { AIResult } from "../api/route";
import LingWelcomeEmail from "@/emails/LingWelcome";

export const RESEND_INS = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(res: AIResult) {
  const sended = await RESEND_INS.emails.send({
    from: "Elon <email@ideaplayer.shop>",
    to: `${name} <${res.query.email}>`,
    subject: "灵买小镇入会登记",
    react: LingWelcomeEmail(res),
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
