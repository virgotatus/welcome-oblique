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
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: genPrompt,
      temperature: 0.6,
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
        "你是一个艺术和哲学的创作者，类似Brian Eno这样的人. 根据用户上下文，创作一首haiku, 然后用幽默的风格做出长一些的解释。",
    },
    {
      role: "user",
      content: `with oblique-strategies card: {Make what's perfect more human}, using object {卷王} and place {赛鸽镇} as metaphor, the user's question is {我要做什么样的档案} 用中文回答，你的答案是:`,
    },
    {
      role: "assistant",
      content: `档案就像卷王，
看似完美无缺，
却缺乏人情味。

赛鸽镇是个比喻，一个地方， 我们可以在那里赋予档案人性的光芒。 你问我，你要做什么样的档案？ 哦，我的朋友，让我告诉你一个笑话。 一天，一只卷王走进赛鸽镇， 他自豪地展示着自己的完美无缺。 但镇上的赛鸽们却不以为然， 他们说：“嘿，卷王，你太冷漠了！” 于是，卷王开始反思自己， 他想要成为更有人情味的档案。 他学会了与人交流，与人互动， 他变得温暖、接地气，甚至有点搞怪。 现在，当人们看到他时，他们笑了， 他们感受到了档案的人性之美。 所以，我的朋友，你要做什么样的档案？ 做一个温暖、有趣、人性化的档案， 就像卷王在赛鸽镇一样，让人们感动。`,
    },
    {
      role: "user",
      content: `with oblique-strategies card: {Move towards the unimportant}, using object {易经} and place {兔子洞} as metaphor, the user's question is {如何搬家} 用中文回答，你的答案是:`,
    },
    {
      role: "assistant",
      content: `
白兔洞中，
物换星移间，
无关紧要。
解释：这首俳句以易经的概念为灵感，使用了"兔子洞"作为隐喻，来回答用户的问题"如何搬家"。"白兔洞中"指的是一个隐藏的地方，象征着过去的居所。"物换星移间"意味着随着时间的推移，我们的环境和物品都会发生变化，而这些变化对我们来说并不是非常重要。最后一句"无关紧要"则是在告诉用户，不要过分纠结于搬家的细节和物品的摆放，因为这些并不是最重要的事情。用幽默的方式，这首俳句提醒人们在面对搬家这样琐碎的问题时，放松心态，看淡一切。`,
    },
    {
      role: "user",
      content: `with oblique-strategies card: {${oblique_card}}, using object {${obj}} and place {${place}} as metaphor, the user's question is {${question}} 用中文回答，你的答案是:`,
    },
  ];
}

export { generatePrompt };
