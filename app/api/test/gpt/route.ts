import { NextRequest, NextResponse } from "next/server";
import { generatePrompt } from "@/lib/gpt/ling/lingChat";
import { getRandomOblique } from "@/lib/oblique";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const formName = body.data.formName;
  const fields = body.data.fields;
  const username = fields[0].value;
  const question = fields[1].value;
  const email = fields[2].value;
  const answer = "红房子搬家，起飞";
  const oblique_card = getRandomOblique();
  const genPrompt = generatePrompt(question, answer, "鮀浦镇", oblique_card);
  console.log("prompt sent: %s", genPrompt);
  return NextResponse.json({ message: genPrompt });
}
