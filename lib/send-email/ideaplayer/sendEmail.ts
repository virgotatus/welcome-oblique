import { IdeaEmail } from "@/emails/ideaplayer/notifyEmail";
import { IdeaResult } from "@/actions/ideaplayer";
import { RESEND_INS } from "../client";


async function sendEmail(email:string, res: IdeaResult) {
  
  const sended = await RESEND_INS.emails.send({
    from: "Elon@灵感炼丹炉 <email@liandanlu.xyz>",
    to: `guest_${res.id}<${email}>`,
    subject: "一份灵感",
    react: IdeaEmail(res),
    reply_to: "gong435491723@gmail.com",
    tags: [
      {
        name: "category",
        value: "register_email",
      },
      {
        name: "project",
        value: "ideaplayer",
      },
    ],
  });
  return sended;
}

export default sendEmail;
