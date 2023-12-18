import { NextRequest, NextResponse } from "next/server";
import { RESEND_INS } from "@/app/send-email/sendEmail";
import TestTemplate from "@/emails/TestTemplate";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const formName = body.data.formName;
  const fields = body.data.fields;
  const username = fields[0].value;
  const question = fields[1].value;
  const email = fields[2].value;
  const answer = "你好，基地啊世界第几";
  const result = await RESEND_INS.emails.send({
    from: "Elonmm <onboarding@resend.dev>",
    to: [`${username} <${email}>`],
    subject: "Welcome to Ling.School",
    text: `${question}`,
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
    react: <TestTemplate text={`"啦啦啦 " ${question} "答案" ${answer}`} />,
  });

  console.log("Message sent: %s", result);
  return NextResponse.json({ message: "email sented" });
}
