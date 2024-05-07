"use server";
import MailFellowEmail from "@/emails/mail-fellow/MailFellow";
import { getProperty } from "@/hooks/notion/read";
import { redirect } from "next/navigation";
import { Resend } from 'resend';
import { Enrollment } from "./tallyField";
import { createPage, generateTextBlock } from "@/hooks/notion/create";
import FellowChat from "@/lib/gpt/mail-fellow/FellowChat";

export interface Contact {
  name: string;
  address: string;
}

export async function sendSubmit(formData: FormData) {
  const pathname = `/admin/mail-fellow/preview/${encodeURIComponent(formData.get("contacts") as string)}/${formData.get("notion_page")}`;
  redirect(pathname);
}

const resend = new Resend(process.env.Q24_RESEND_API_KEY);

export async function sendMail(prevState: any, contacts: Contact[], notion_page: string) {
  console.log(contacts);
  console.log(notion_page);
  const subject = await getProperty(notion_page, "title");
  for (const receiver of contacts) {
    console.log(receiver);
    const sended = await resend.emails.send({
      from: "Soro <soro@q24.io>",
      to: `${receiver.name} <${receiver.address}>`,
      subject: subject!,
      react: await MailFellowEmail(notion_page),
      reply_to: "s@q24.io",
      // attachments: attachments,
      headers: {
        "X-Entity-Ref-ID": "lingschool",
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
    const message = `Sending email to <${receiver.name}> Succeed!!!`;
    console.log(message);
  }
  
  return {
    message: `Sending email to <${contacts.map((receiver) => receiver.name).join(" , ")}> Succeed!!!`
  }
}


export async function processEnroll(enroll: Enrollment, createTime: Date) {
  const title = enroll.username + "_" + createTime.toLocaleDateString();
  const month_id = await createPage({parent_id: process.env.Q24_NOTION_PARENT_PAGE!, title: title});
  console.log(title);
  for (var week of ["1","2","3","4"]) {
    const title_week = "第" + week + "周";
    const { result: content, status } = await FellowChat({
      enroll: enroll
    });
    console.log(content);
    const block = await generateTextBlock(content);
    await createPage({parent_id: month_id!, title: title_week, children: [block]});
    console.log(title_week);
  }
}