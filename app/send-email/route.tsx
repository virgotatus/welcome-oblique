import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/app/send-email/sendEmail";

export async function POST(request: NextRequest) {
  const info = await sendEmail({
    name: "gyl",
    email: "435491723@qq.com",
    message: "hihi",
  });
  console.log("Message sent: %s", info.messageId);
  return NextResponse.json({ message: "email sented" });
}
