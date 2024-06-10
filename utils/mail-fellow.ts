import { generateTextBlock } from "@/hooks/notion/create";
import { getEntityByTitle } from "@/hooks/notion/read/database";

import { Contact } from "@/actions/mail-fellow"

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

export async function tool_format(tool:string, tool_explain: string) {
  const result = await getEntityByTitle(process.env.Q24_TOOL_DATABASE!, "工具名称", tool);
  const block = await generateTextBlock(`有用的工具:${tool}  Soro的解释:${tool_explain}`);
}