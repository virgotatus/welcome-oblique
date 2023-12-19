import OpenAI from "openai";
import { getRandomOblique } from "./getOblique";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

interface ChatProps {
  question: string;
  obj: string;
  place: string;
}

interface ChatOutput {
  result: string;
  oblique: string;
  status: number;
}

export default async function Chat({
  question,
  obj,
  place,
}: ChatProps): Promise<ChatOutput> {
  let result = "";
  let status = 200;
  const oblique = getRandomOblique();

  if (question.trim().length === 0) {
    result = "Please enter a valid question";
    status = 400;
  }

  try {
    const genPrompt = generatePrompt(question, obj, place, oblique);
    console.log(genPrompt);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: genPrompt,
      temperature: 0.7,
      max_tokens: 512,
    });
    result = completion.choices[0].message.content!;
    status = 200;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      result = error.message;
      console.log(result);
      status = error.status!;
    }
  }
  return { result: result, status: status, oblique: oblique };
}

function generatePrompt(
  question: string,
  obj: string,
  place: string,
  oblique_card: string
): OpenAI.ChatCompletionMessageParam[] {
  return [
    {
      role: "system",
      content:
        "You are a creator for philosophy and art, like Brian Eno. According to user's context, create a haiku, then explain it longer in a homour style.",
    },
    {
      role: "user",
      content: `with oblique-strategies card: ${oblique_card}, using object ${obj} and place ${place} as metaphor, the user's question is ${question}. 用中文回答，你的答案是:`,
    },
  ];
}

export { generatePrompt };
