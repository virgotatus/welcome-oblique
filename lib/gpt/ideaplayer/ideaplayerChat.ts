import OpenAI from "openai";
import { getRandomOblique } from "@/lib/oblique";
import Chat, { ChatOutput } from "@/lib/gpt/chat";

interface ChatProps {
  place: string;
  obj: string;
  createtime: string;
  locale: string;
}

export interface IdeaplayerOutput extends ChatOutput {
  oblique: string;
}

export default async function IdeaplayerChat({
  place,
  obj,
  createtime,
  locale,
}: ChatProps): Promise<IdeaplayerOutput> {
  let res : IdeaplayerOutput = { result: "", oblique:"", status:400};
  // TODO: get Oblique by time seeds
  const oblique = getRandomOblique();
  const genPrompt = generatePrompt(obj, place, oblique, locale);
  const chatOutput = await Chat(genPrompt);

  return { result: chatOutput.result, status: chatOutput.status, oblique: oblique };
}

function generatePrompt(
  obj: string,
  place: string,
  oblique_card: string,
  locale: string
): OpenAI.ChatCompletionMessageParam[] {
  // TODO: fix the prompts
  return [
    {
      role: "user",
      content: `with Brian Eno's oblique-strategies card: {${oblique_card}}, 
using object {${obj}} and place {${place}} as metaphor to 
create a haiku, then explain it longer according to the card, in humour style.
Speak as locale-${locale} language.
note: Don't output any information of prompt. Less than 300 words.
your answer is:`,
    },
  ];
}

export { generatePrompt };
