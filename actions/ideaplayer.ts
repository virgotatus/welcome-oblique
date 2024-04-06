"use server";

import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import IdeaplayerChat from "@/lib/gpt/ideaplayer/ideaplayerChat";
import { AIResult } from "@/actions/type";

interface IdeaplayerForm {
  place: string;
  obj: string;
  createtime: string;
  locale: string;
}

export interface IdeaResult extends AIResult {
  query: IdeaplayerForm;
}


export async function ideaSubmit(formData: FormData) {
  const rawFormData: IdeaplayerForm = {
    place: formData.get("city") as string,
    obj: formData.get("thing") as string,
    createtime: formData.get("gtime") as string,
    locale: "zh"
  };
  // TODO: validate datae
  if (!(rawFormData.place && rawFormData.obj && rawFormData.createtime)) {
    return "error";
  }
  // TODO: add locale zh or en??

  const { result, status, oblique } = await IdeaplayerChat({
    place: rawFormData.place as string,
    obj: rawFormData.obj as string,
    createtime: rawFormData.createtime as string,
    locale: rawFormData.locale,
  });

  const idea = await prisma.ideaplayer.create({
    data: {
      city: rawFormData.place as string, 
      thing: rawFormData.obj as string,
      oblique: oblique,
      style: "humour",
      answer: result,
      locale: rawFormData.locale,
    },
  })
  console.log(result);
  if (status !== 200) {
    // catch error
    console.error(result + " chat completion error!");
    // TODO: assetion!
  }

  redirect(`/ideaplayer/${idea.id}`);
}