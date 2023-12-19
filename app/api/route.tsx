import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/app/send-email/sendEmail";
import Chat from "@/app/_gpt/openaiChat";
import moment from "moment";

const PlaceID = [
  "0a8c5b4e-18a1-4808-bf8b-c56aa5e544dc",
  "ac7c13c3-266b-41d4-91e8-7f085cf528df",
  "78d1115d-0a06-4525-8ce1-a000f6edfbe0",
];

function getIndex(value: string, arr: string[]) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
  return -1; //to handle the case where the value doesn't exist
}

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
  const eventId = requestBody.eventId;
  const formName = requestBody.data.formName;
  const createTime = moment(new Date(requestBody.createdAt)).format(
    "YYYY-MM-DD HH:mm:ss"
  );
  const fields = requestBody.data.fields;
  const username = fields[0].value;
  const question = fields[1].value;
  const email = fields[2].value;
  const place_idx = getIndex(fields[3].value[0], PlaceID);
  const place = Places[place_idx]; // fiels[3]? 0~1
  const obj = fields[4 + place_idx].value;
  console.log(eventId, createTime, username, email, question, place, obj);
  return {
    username: username,
    question: question,
    email: email,
    place: place,
    obj: obj,
    createtime: createTime,
  };
}

async function processTally(tally: TallyForm) {
  const { result, status, oblique } = await Chat({
    question: tally.question,
    obj: tally.obj,
    place: tally.place,
  });
  const AIres: AIResult = { query: tally, answer: result, oblique: oblique };
  console.log(tally.question, result);
  const info = await sendEmail(AIres);
  console.log("Email sent: %s", info);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const tally = parseTally(body);
  const job = processTally(tally).then(() => {
    console.log("finish processing Tally!");
  });
  return NextResponse.json({ status: 200 });
}
