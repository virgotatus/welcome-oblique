// POST

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeTemplate from "@/app/email-template/WelcomeTemplate";
import sendEmail from "@/app/send-email/sendEmail";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const formName = body.data.formName;
  const fields = body.data.fields;
  const username = fields[0].value;
  const question = fields[1].value;
  // const email = fields[2].value;
  console.log(username, question);
  const info = await sendEmail({
    name: username,
    email: "435491723@qq.com",
    message: question,
  });
  console.log("Message sent: %s", info.messageId);
  return NextResponse.json({ success: true });
}
