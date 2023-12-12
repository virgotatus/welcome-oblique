import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function (question: string) {
  let result = "";
  let status = 200;

  if (question.trim().length === 0) {
    result = "Please enter a valid question";
    status = 400;
  }

  try {
    console.log(generatePrompt(question));
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: generatePrompt(question) }],
      temperature: 0.6,
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
  return { result, status };
}

function generatePrompt(question: string) {
  return `"I have a question: ${question}, 
please help me know how to answer it. 
you should be humourous and creative."`;
}
