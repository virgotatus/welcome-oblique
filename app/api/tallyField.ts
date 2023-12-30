const TALLY_KEY = {
  email: "question_dWM1Ry",
  username: "question_BzylgY",
  question: "question_Zj7LRe",
  place: "question_68lzXY",
  object: "no need, place id + answer_idx",
};

interface optionType {
  id: string;
  text: string;
}

interface TallyField {
  key: string;
  value: string;
  options?: optionType[];
}

export const Places = ["猛虎镇", "赛鸽镇", "兔子洞"];

function getPlace(unit: TallyField): { placeid: number; place: string } {
  const value = unit["value"][0];
  const options = unit["options"]!;
  for (var i = 0; i < options.length; i++) {
    if (options[i].id === value) {
      return { placeid: i, place: Places[i] };
    }
  }
  return { placeid: 0, place: Places[0] };
}

function getTallyField(fields: TallyField[]) {
  const username = fields.find(
    (field) => field.key === TALLY_KEY.username
  )!.value;
  const question = fields.find(
    (field) => field.key === TALLY_KEY.question
  )!.value;
  const email = fields.find((field) => field.key === TALLY_KEY.email)!.value;
  const placeIdx = fields.findIndex((field) => field.key === TALLY_KEY.place)!;
  const { placeid, place } = getPlace(fields[placeIdx]); // fiels[3]? 0~1
  const obj = fields[placeIdx + placeid + 1].value;
  return { username, question, email, place, obj };
}

export default getTallyField;
