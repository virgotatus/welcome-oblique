"use server";
import MailFellowEmail from "@/emails/mail-fellow/MailFellow";
import { redirect } from "next/navigation";
import { Resend } from 'resend';

import FellowChat from "@/lib/gpt/mail-fellow/FellowChat";
import fetchBackend, { AmateurEmbed, IdeaEmbed, ToolEmbed, fetchAmateur } from "@/hooks/backend/request";
import { getContent, getProperty } from "@/hooks/notion/read";
import { createPage } from "@/hooks/notion/create";
import { generate_textblock } from "@/hooks/notion/update";
import { update_amateur_template, update_idea_template, update_liandanlu, update_tool_template } from "@/hooks/notion/update/mail-fellow";
import { query_user_by_month, query_user_by_name, UserRecord } from "@/hooks/notion/read/fellowUsers";

const Q24_TEMPLATE_FIRST="0b84eb54d5c54d5c8d53ea1f72c83fa9";
const Q24_TEMPLATE_SECOND="3069109e587544119fb71e2fb10006dd";
const Q24_TEMPLATE_THIRD="4b7f334f661b4c32968688c2f6a5c2cf";
const Q24_TEMPLATE_FORTH="e5cc1a7c76db40768efdd6fb526243f3";
const Q24_TEMPLATE_LIST=[Q24_TEMPLATE_FIRST, Q24_TEMPLATE_SECOND, Q24_TEMPLATE_THIRD, Q24_TEMPLATE_FORTH];
export interface Contact {
  name: string;
  address: string;
}

export async function sendSubmit(formData: FormData) {
  console.log(formData);
  if ((formData.get("auto_option")) === "true") {
    const month = formData.get("month") as string;
    const week = formData.get("week") as string;
    
    const users = await query_user_by_month(month);

    await Promise.all(
      users.map(async (user) => {
        try {
        await processEnrollUser(user, week);
      } catch(e) {
        console.log(e, user);
      }
      })
    );
    const user_names = formData.get("contacts") as string;
    user_names?.trim().split(/\r?\n/).forEach(async (name) => {
        const user = await query_user_by_name(name);
        await processEnrollUser(user, week);
    });
    console.log("finished generating");
  }
  else {
    redirect(`/admin/mail-fellow/manual-preview/${encodeURIComponent(formData.get("contacts") as string)}/${formData.get("notion_page")}`);
  }
}

const resend = new Resend(process.env.Q24_RESEND_API_KEY);

export async function sendMail(prevState: any, contacts: Contact[], notion_page: string) {
  console.log(contacts);
  console.log(notion_page);
  const subject = await getProperty(notion_page, "title");
  const blocks = await getContent(notion_page);
  let send_states = []
  for (const receiver of contacts) {
    const sended = await resend.emails.send({
      from: "Soro <soro@q24.io>",
      to: `${receiver.name} <${receiver.address}>`,
      bcc: [`s<s@q24.io>`],
      subject: subject!,
      react: MailFellowEmail(blocks),
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
    console.log(sended.error ? sended.error.message :`Sending email to <${receiver.name}> "succeed"!!!`);
    const message = `<${receiver.name}> "${sended.error ? "error" :"succeed"}"!!!`;
    send_states.push(message);
  }
  
  return {
    message: `Sending email to <${send_states.map((states) => states).join(" , ")}> Finished!!!`
  }
}


export async function processEnrollUser(enroll: UserRecord, week_idx:string) {
  const name = enroll.name;
  //+ "_" + createTime.toLocaleDateString(undefined, {
  //   year: "numeric",
  //   month: 'numeric',
  // });
  // const loops = [
    //   "第一封信：开启你的创作之旅（今晚 9 点咕咕会）｜在业余公司各自玩",
    //   "第二封信：领取一张旅途中的「工具卡」｜在业余公司各自玩",
    //   "第三封信：领取一张旅途中的「灵感卡」｜在业余公司各自玩",
    //   "第四封信：领取一张旅途中的「同伴卡」｜在业余公司各自玩",
    //   "第五封信：领取一张旅途中的「同伴卡」｜在业余公司各自玩",
    // ];
  const template_id = Q24_TEMPLATE_LIST[Number(week_idx)];
  const title_week = await getProperty(template_id, "title");
  
  console.log(name, "week: ", week_idx);
  let blocks : any[] = [];

  switch (week_idx) {
    case "0":
      const { result: strategy, status } = await FellowChat({
        enroll: {username: enroll.name, email: enroll.email, question: enroll.question, goal: enroll.project, city: enroll.city}
      });
      blocks.push(...(await update_liandanlu(strategy, enroll.project, enroll.question, template_id)));
      break;
    case "1":
      const tool_entity = await fetchBackend("tool", enroll.question, 1) as ToolEmbed;
      blocks.push(...(await update_tool_template(tool_entity, enroll.project, template_id)));
      break;
    case "2":
      // note top2!!!
      console.log(enroll);
      const amateur_entity = await fetchAmateur(enroll.name, enroll.project, enroll.city , 1) as AmateurEmbed;
      blocks.push(...(await update_amateur_template(amateur_entity, template_id)));
      break;
    case "3":
      const idea_entity = await fetchBackend("idea", enroll.question, 1) as IdeaEmbed;
      blocks.push(...(await update_idea_template(idea_entity, template_id)));
      break;
    default:
      blocks.push(generate_textblock(`谢谢惠顾！`));
      break;
  }
  const page = await createPage({parent_id: enroll.page_id, title: title_week!, children: blocks});
  console.log("succees", name," ", title_week, " ",page);
}