import { TallyField } from "@/hooks/tally/type";

const TALLY_KEY = {
  username: "question_BE2VvY",
  email: "question_1WpgjL",
  playself: "question_gbkxBK",
  playselfAnswer: "9f6671bf-94c4-49f9-b8d5-c3b50a3c0211",
  goal: "question_KpaNXK",
  question: "question_J1WZy7",
};

export interface Enrollment {
  username: string;
  email: string;
  question: string;
  goal: string;
} 

function getTallyField(fields: TallyField[]) : Enrollment | null {
  if (fields.find((field) => field.key === TALLY_KEY.playself)!.value[0] !== TALLY_KEY.playselfAnswer) {
    return null;
  }
  const username = fields.find(
    (field) => field.key === TALLY_KEY.username
  )!.value;
  const question = fields.find(
    (field) => field.key === TALLY_KEY.question
  )!.value;
  const email = fields.find((field) => field.key === TALLY_KEY.email)!.value;
  const goal = fields.find((field) => field.key === TALLY_KEY.goal)!.value;
  return { username, email, question, goal } ;
}

export default getTallyField;