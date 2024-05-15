import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Contact } from "@/actions/mail-fellow"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseContacts(contacts: string) {
  let res: Contact[] = [];
  contacts.trim().split(/\r?\n/).map((line) => {
    const [name, address] = line.split(/\s+/);
    res.push({ name: name, address: address });
  });
  return res;
}

export function mentionLink(href:string) {
  if (href.startsWith("http")) {
    return href
  } else {
    return `${process.env.Q24_NOTION_ROOT}${href}`
  }
}