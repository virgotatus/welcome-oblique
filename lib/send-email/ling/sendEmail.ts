import LingWelcomeEmail from "@/emails/ling/LingWelcome";
import { fetchTickets, PayloadProps } from "@/lib/imgRender/ling/fetchTickets";
import { LingResult } from "@/actions/ling";
import { resultSplit } from "./dataFormat";
import { RESEND_INS } from "../client";

async function sendEmail(res: LingResult) {
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
    bcc: [`bob<${process.env.Q24_BOB_MAIL}>`,`fori<${process.env.Q24_FORI_MAIL}>`],
    subject: "一份灵感彩蛋",
    react: LingWelcomeEmail(res),
    reply_to: `${process.env.EMAIL_GMAIL}`,
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
