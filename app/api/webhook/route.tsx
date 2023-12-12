// POST

import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/app/send-email/sendEmail";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const formName = body.data.formName;
  const fields = body.data.fields;
  const username = fields[0].value;
  const question = fields[1].value;
  const email = fields[2].value;
  console.log(username, question);
  const info = await sendEmail({
    name: username,
    email: email,
    message: question,
  });
  console.log("Message sent: %s", info.messageId);
  return NextResponse.json({ success: true });
}
