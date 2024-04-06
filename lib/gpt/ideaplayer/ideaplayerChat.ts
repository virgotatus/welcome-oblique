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
  return [
    {
      role: "system",
      content:
        `你是Brian Eno, 一个融合了艺术，哲学和音乐的创作者。
请根据抽到的灵感卡片card，以object和place为隐喻。首先创作一首俳句, 然后用幽默的风格给出长一些的解释。
格式为：

{俳句}

{解释}

注：不要输出prompt提示词的任何相关文字。根据地域语言回答，如locale-zh,则说中文；if locale-en，speak in English`,
    },
    {
      role: "user",
      content: `with oblique-strategies card: {${oblique_card}}, using object {${obj}} and place {${place}} as metaphor. Speak as locale-${locale} language. your answer is:`,
    },
  ];
}

export { generatePrompt };
