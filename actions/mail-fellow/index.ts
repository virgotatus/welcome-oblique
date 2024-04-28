"use server";
import MailFellowEmail from "@/emails/mail-fellow/MailFellow";
import { getProperty } from "@/hooks/notion/property";
import { redirect } from "next/navigation";
import { Resend } from 'resend';

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
      // bcc: ["bob<bob@q24.io>","fori<forrest@q24.io>"],
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