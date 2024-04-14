"use server";
import { redirect } from "next/navigation";

export interface Receiver {
  name: string;
  address: string;
}

export async function sendSubmit(formData: FormData) {
  const pathname = `/admin/mail-fellow/preview/${encodeURIComponent(formData.get("receivers") as string)}/${formData.get("notion_page")}`;
  redirect(pathname);
}

export async function sendMail(receivers: Receiver[], notion_page: string) {

  console.log(receivers);
  console.log(notion_page);
}