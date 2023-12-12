import React from "react";
import { Resend } from "resend";

import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/app/send-email/sendEmail";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const info = await sendEmail({
    name: "gyl",
    email: "435491723@qq.com",
    message: "hihi",
  });
  console.log("Message sent: %s", info.messageId);
  return NextResponse.json({ message: "email sented" });
}
