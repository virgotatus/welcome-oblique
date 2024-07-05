import OpenAI from "openai";
import { getRandomOblique } from "@/lib/oblique";
import Chat, { ChatOutput } from "@/lib/gpt/chat";
import { Enrollment } from "@/actions/mail-fellow/tallyField";


export default async function FellowChat({ enroll }: {enroll: Enrollment})
: Promise<ChatOutput> 
{
  const oblique = getRandomOblique();
  const genPrompt = generatePrompt({enroll:enroll, oblique_card: oblique});
  const chatOutput = await Chat(genPrompt, "gpt-4-turbo");

  return { result: chatOutput.result, status: chatOutput.status, oblique: oblique };
}

// 在这里修改Prompt
function generatePrompt(
  { enroll, oblique_card }: {enroll: Enrollment, oblique_card: string}
): OpenAI.ChatCompletionMessageParam[] {
  return [
    {
      role: "system",
      content:
        `你是Brian Eno, 一个音乐艺术创作者,善于用策略卡片在项目停滞的时候给自己产生灵感、并重新启动，增加行动力。面对一个前来讨论的青年创作者，你需要推动他往前走。
请根据抽到的策略卡片card, 结合来访的目标，从他的一个问题出发, 结合曾经的项目, 给出回答。
首先: 创作一首俳句
然后: 用幽默的风格给出解释。

格式为：
{俳句}
{解释}

注：直接给出回答，不需要输出提示词。解释请精简一点，200字左右。`,
    },
    {
      role: "user",
      content: `策略卡片: {${oblique_card}}, 来访最希望完成的事 {${enroll.goal}} , 来访的问题 {${enroll.question}}. 用中文回应，你的回应是:`,
    },
  ];
}

export { generatePrompt };
