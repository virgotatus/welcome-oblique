
interface optionType {
  id: string;
  text: string;
}

export interface TallyField {
  key: string;
  value: string;
  options?: optionType[];
}