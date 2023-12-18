// POST

import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/app/send-email/sendEmail";
import openaiChat from "@/app/gpt/openaiChat";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const formName = body.data.formName;
  const fields = body.data.fields;
  const username = fields[0].value;
  const question = fields[1].value;
  const email = fields[2].value;
  const { result, status } = await openaiChat(question);
  console.log(username, question, result);
  const info = await sendEmail({
    name: username,
    email: email,
    message: question + "\n" + "回答是:" + result + "\n",
  });
  console.log("Message sent: %s", info);
  return NextResponse.json({ status: { status } });
}
