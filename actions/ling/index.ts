import sendEmail from "@/lib/send-email/ling/sendEmail";
import LingChat from "@/lib/gpt/ling/lingChat";
import moment from "moment";
import prisma from "@/prisma/client";
import getTallyField from "./tallyField";
import { AIResult } from "../type";

interface TallyForm {
  username: string;
  question: string;
  email: string;
  place: string;
  obj: string;
  createtime: string;
}

export interface LingResult extends AIResult {
  query: TallyForm;
}


export function parseTally(requestBody: any): TallyForm {
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

export async function processTally(tally: TallyForm) {
  const { result, status, oblique } = await LingChat({
    question: tally.question,
    obj: tally.obj,
    place: tally.place,
  });
  // save to db
  console.log(`Database_url: ${process.env.DATABASE_URL}`);
  const ling = await prisma.ling.create({
    data: {
      email: tally.email, username: tally.username, question: tally.question, place: tally.place, obj: tally.obj, content: result
    },
  })
  const AIres: LingResult = { id: ling.id, query: tally, answer: result, oblique: oblique };
  console.log(tally.question, result);
  if (status !== 200) {
    // catch error
    console.error(result + " chat completion error!");
    AIres.query.email = "gong435491723@gmail.com";
  }
  const sended = await sendEmail(AIres);
  console.log("Email sent: %s", sended.data || sended.error);
}