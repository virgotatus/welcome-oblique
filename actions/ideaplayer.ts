"use server";

import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import IdeaplayerChat from "@/lib/gpt/ideaplayer/ideaplayerChat";
import { AIResult } from "@/actions/type";
import sendEmail from "@/lib/send-email/ideaplayer/sendEmail";
import imgrender from "@/lib/imgRender/client";
import { Payload } from "@/lib/imgRender/ideaplayer/payload";

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
    locale: formData.get("locale") as string,
  };
  // TODO: validate data
  if (!(rawFormData.place && rawFormData.obj && rawFormData.createtime)) {
    return "error";
  }

  const { result, status, oblique } = await IdeaplayerChat({
    place: rawFormData.place as string,
    obj: rawFormData.obj as string,
    createtime: rawFormData.createtime as string,
    locale: rawFormData.locale,
  });

  console.log(rawFormData.createtime, new Date(rawFormData.createtime));

  const idea = await prisma.ideaplayer.create({
    data: {
      city: rawFormData.place as string, 
      thing: rawFormData.obj as string,
      oblique: oblique!,
      style: "humour",
      answer: result,
      locale: rawFormData.locale,
      created_at: new Date(rawFormData.createtime),
    },
  })
  console.log("LianDanLu：", result);
  if (status !== 200) {
    // catch error
    console.error(result + " chat completion error!");
    // TODO: assetion!
  }

  redirect(`/ideaplayer/idea/${idea.id}`);
}


export async function ideaEmail(id:number, formData: FormData) {
  console.log("id:", id, formData.get("email_addr"))
  const idea = await prisma.ideaplayer.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (idea) {
    const result:IdeaResult = {
       id:idea.id,
       oblique: idea.oblique, 
       answer: idea.answer || "",
       query: {
        place: idea.city, 
        obj: idea.thing, 
        createtime:idea.created_at.toLocaleDateString(idea.locale),
        locale: idea.locale
      }
    }
    const sended = await sendEmail(formData.get("email_addr")! as string, result);
    await prisma.ideaplayer.update({
      where: {id: idea.id},
      data: {
        email: formData.get("email_addr")! as string
      }
    });
    console.log("Email sent: %s", sended.data || sended.error);
    return {
      message: `Email sent: ${sended.data} succeed!`
    };
  } else {
    return {
      message: 'Sending failed',
    }
  }
}


export async function fetchPoster(id: string) {
  const idea = await prisma.ideaplayer.findUnique({
    where: {
      id: Number(id),
    },
  });

  // TODO: time
  const payload = Payload({createtime : idea!.created_at.toLocaleDateString(idea!.locale),
   place: idea!.city, object: idea!.thing, oblique: idea!.oblique, answer: idea!.answer!});
  const {url, img64} = await imgrender(payload);  
  return {url: url, img64: img64};
}
