import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/app/send-email/sendEmail";
import Chat from "@/app/_gpt/openaiChat";
import moment from "moment";

const Places = ["猛虎镇", "赛鸽镇", "兔子洞"];

interface TallyForm {
  username: string;
  question: string;
  email: string;
  place: string;
  obj: string;
  createtime: string;
}

export interface AIResult {
  query: TallyForm;
  answer: string;
  oblique: string;
}

function parseTally(requestBody: any): TallyForm {
  const formName = requestBody.data.formName;
  const createTime = moment(new Date(requestBody.createdAt)).format(
    "YYYY-MM-DD HH:mm:ss"
  );
  const fields = requestBody.data.fields;
  const username = fields[0].value;
  const question = fields[1].value;
  const email = fields[2].value;
  const place = Places[fields[3].value]; // fiels[3]? 0~1
  const obj = fields[4].value;
  return {
    username: username,
    question: question,
    email: email,
    place: place,
    obj: obj,
    createtime: createTime,
  };
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const tally = parseTally(body);
  const { result, status, oblique } = await Chat({
    question: tally.question,
    obj: tally.obj,
    place: tally.place,
  });
  const AIres: AIResult = { query: tally, answer: result, oblique: oblique };
  console.log(tally.username, result);
  const info = await sendEmail(AIres);
  console.log("Message sent: %s", info);
  return NextResponse.json({ status: { status } });
}
