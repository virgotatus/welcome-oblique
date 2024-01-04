import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/app/send-email/sendEmail";
import Chat from "@/app/_gpt/openaiChat";
import moment from "moment";
import getTallyField from "./tallyField";
import prisma from "@/prisma/client";

interface TallyForm {
  username: string;
  question: string;
  email: string;
  place: string;
  obj: string;
  createtime: string;
}

export interface AIResult {
  id : number;
  query: TallyForm;
  answer: string;
  oblique: string;
}

function parseTally(requestBody: any): TallyForm {
  const eventId = requestBody.eventId;
  const formName = requestBody.data.formName;
  const createTime = moment(new Date(requestBody.createdAt)).format(
    "YYYY年MM月DD日 HH:mm"
  );
  const fields = requestBody.data.fields;
  const { username, question, email, place, obj } = getTallyField(fields);
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
  // save to db
  const post = await prisma.post.create({
    data: {
      email: tally.email, username: tally.username, question: tally.question, place: tally.place, obj: tally.obj, content: result
    },
  })
  const AIres: AIResult = { id: post.id, query: tally, answer: result, oblique: oblique };
  console.log(tally.question, result);
  if (status !== 200) {
    // catch error
    console.error(result + " chat completion error!");
    AIres.query.email = "gong435491723@gmail.com";
  }
  const sended = await sendEmail(AIres);
  console.log("Email sent: %s", sended.data && sended.error);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const tally = parseTally(body);
  const job = processTally(tally).then(() => {
    console.log("finish processing Tally!");
  });
  return NextResponse.json({ status: 200 });
}

export function GET(request: NextRequest) {
  return NextResponse.json({ hello: "hello" });
}