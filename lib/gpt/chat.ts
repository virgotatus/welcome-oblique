import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.ONE_API_URL!
});

export interface ChatOutput {
  result: string;
  status: number;
  oblique?: string;
}

// mixtral-8x22b deepseek-chat claude
export default async function Chat(
  messages : OpenAI.ChatCompletionMessageParam[],
  model : string = "gpt-3.5-turbo"
  ) : Promise<ChatOutput> 
{
  let result = "";
  let status = 200;
  try {
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
      temperature: 0.6,
    });
    result = completion.choices[0].message.content!;
    status = 200;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      // result = "炼丹炉核心没钱或爆炸了 \n\n 请联系鲍勃或elon尽快维修。";
      console.error("openai api error!", error);
      result = "openai api error!";
      status = error.status!;
    }
  }
  return { result: result, status: status};
}