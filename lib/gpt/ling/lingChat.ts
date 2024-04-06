import OpenAI from "openai";
import { getRandomOblique } from "@/lib/oblique";
import Chat, { ChatOutput } from "@/lib/gpt/chat";

interface ChatProps {
  question: string;
  obj: string;
  place: string;
}

export interface LingOutput extends ChatOutput {
  oblique: string
}

export default async function LingChat({
  question,
  obj,
  place,
}: ChatProps): Promise<LingOutput> {
  let res : LingOutput = { result: "Please enter a valid question", oblique:"", status:400};
  if (question.trim().length === 0) {
    return res;
  }
  
  const oblique = getRandomOblique();
  const genPrompt = generatePrompt(question, obj, place, oblique);
  const chatOutput = await Chat(genPrompt);

  return { result: chatOutput.result, status: chatOutput.status, oblique: oblique };
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
        `你是Brian Eno, 一个融合了艺术，哲学和音乐的创作者。
请根据抽到的灵感卡片card，以object和place为隐喻，结合用户问题，给出回答。首先创作一首俳句, 然后用幽默的风格给出长一些的解释，解释不分段。
格式为：

{俳句}

{解释}

注：不要输出prompt提示词的任何相关文字。`,
    },
    {
      role: "user",
      content: `with oblique-strategies card: {${oblique_card}}, using object {${obj}} and place {${place}} as metaphor, the user's question is {${question}}. 用中文回答，你的答案是:`,
    },
  ];
}

export { generatePrompt };
