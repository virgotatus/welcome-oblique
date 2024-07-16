import { Contact } from "@/actions/mail-fellow"

export function parseContacts(contacts: string) {
  let res: Contact[] = [];
  contacts.trim().split(/\r?\n/).map((line) => {
    const splited_param = line.split(/\s+/);
    const address = splited_param.pop();
    const name = splited_param.join(" ");
    res.push({ name: name, address: address! });
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

