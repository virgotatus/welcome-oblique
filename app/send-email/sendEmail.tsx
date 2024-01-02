import { Resend } from "resend";
import { AIResult } from "../api/route";
import LingWelcomeEmail from "@/emails/LingWelcome";
import LingSchoolEmail from "@/emails/LingSchool";
import { fetchTickets } from "../imgrender/fetchTickets";
import { PayloadProps } from "../imgrender/payload";
import { resultSplit } from "./dataFormat";
import fs from "fs";

export const RESEND_INS = new Resend(process.env.RESEND_API_KEY);

function deleteFile(path: string) {
  if (fs.existsSync(path)) {
    // Delete the file
    fs.unlink(path, (err) => {
      if (err) {
        console.error("Error deleting the file", err);
      } else {
        console.log("File deleted successfully");
      }
    });
  }
}

async function sendEmail(res: AIResult) {
  const { state, danwen, explaination } = resultSplit(res.answer);
  if (state !== 0) {
    const sended = await RESEND_INS.emails.send({
      from: "Elon@灵感炼丹炉 <email@ideaplayer.shop>",
      to: `${res.query.username} <${res.query.email}>`,
      bcc: "bob<bob@q24.io>",
      subject: "一份灵感彩蛋",
      react: LingWelcomeEmail(res),
      reply_to: "gong435491723@gmail.com",
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
  } else {
    const aires: PayloadProps = {
      id: res.id,
      createtime: res.query.createtime,
      place: res.query.place,
      username: res.query.username,
      danwen: danwen,
      oblique: res.oblique,
      explaination: explaination,
    };
    const filefront = `public/share_image/front_${res.id}.jpg`;
    const fileback = `public/share_image/back_${res.id}.jpg`;
    const { front_img64, back_img64 } = await fetchTickets(
      aires,
      filefront,
      fileback
    );
    const sended = await RESEND_INS.emails.send({
      from: "Elon@灵感炼丹炉 <email@ideaplayer.shop>",
      to: `${res.query.username} <${res.query.email}>`,
      bcc: "bob<bob@q24.io>",
      subject: "一份灵感彩蛋",
      react: LingSchoolEmail(front_img64, back_img64),
      reply_to: "gong435491723@gmail.com",
      attachments: [
        {
          filename: `${filefront}`,
          content: "image/jpg",
        },
        {
          filename: `${fileback}`,
          content: "image/jpg",
        },
      ],
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
    deleteFile(filefront);
    deleteFile(fileback);
    return sended.data;
  }
}

export default sendEmail;
