import { Resend } from "resend";
import LingWelcomeEmail from "@/emails/LingWelcome";
import LingSchoolEmail from "@/emails/LingSchool";
import { fetchTickets, PayloadProps } from "@/lib/imgRender/ling/fetchTickets";
import { AIResult } from "@/actions/ling";
import { resultSplit } from "./dataFormat";

export const RESEND_INS = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(res: AIResult) {
  const { state, danwen, explaination } = resultSplit(res.answer);
  const aires: PayloadProps = {
    id: res.id,
    createtime: res.query.createtime,
    place: res.query.place,
    username: res.query.username,
    danwen: danwen,
    oblique: res.oblique,
    explaination: explaination,
    oneside: state === -1,
  };
  const { front_img64, back_img64 } = await fetchTickets(aires);
  const attachments = [
    ...(front_img64 !== ""
      ? [{ filename: "ticket_frontside.jpg", content: front_img64 }]
      : []),
    ...(back_img64 !== ""
      ? [{ filename: "ticket_backside.jpg", content: back_img64 }]
      : []),
  ];
  const sended = await RESEND_INS.emails.send({
    from: "Elon@灵感炼丹炉 <email@liandanlu.xyz>",
    to: `${res.query.username} <${res.query.email}>`,
    bcc: "bob<bob@q24.io>",
    subject: "一份灵感彩蛋",
    react: LingWelcomeEmail(res),
    reply_to: "gong435491723@gmail.com",
    attachments: attachments,
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
  return sended;
}

export default sendEmail;
