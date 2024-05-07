import { processEnroll } from "@/actions/mail-fellow";
import getTallyField from "@/actions/mail-fellow/tallyField";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  const body = await request.json();
  const eventId = body.eventId;
  const formName = body.data.formName;
  const fields = body.data.fields;
  const createTime = (new Date(body.createdAt));
  console.log(eventId, formName, createTime.toLocaleString());
  const tally = getTallyField(fields);
  console.log(tally ? "各自玩": "一起玩");
  if (tally) {
    const job = processEnroll(tally, createTime).then(() => {
      console.log("各自玩Notion所有周的邮件已创建!");
    });
  }

  return NextResponse.json({ status: 200 });
}

export function GET(request: NextRequest) {
  return NextResponse.json({ hello: "hello" });
}