"use server";

import { redirect } from "next/navigation";


interface IdeaplayerForm {
  place: string;
  obj: string;
  createtime: string;
}

export interface AIResult {
  id : number;
  query: IdeaplayerForm;
  answer: string;
  oblique: string;
}


export async function ideaSubmit(formData: FormData) {
  const rawFormData = {
    city: formData.get("city"),
    thing: formData.get("thing"),
    time: formData.get("gtime"),
  };
  console.log(formData);
  console.log(rawFormData);
  const id = 0;
  redirect(`/ideaplayer/${id}`);
}