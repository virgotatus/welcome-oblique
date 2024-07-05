import { RichText } from "../type";
import { merge_plain_text } from "../utils";
import { getEntityByTitle, filterSelect } from "./database";

interface UserNotionResponse {
  object: "page",
  id: string;
  properties: {
    Email: {
      email: string;
    },
    Question: {
      rich_text: RichText[];
    },
    Project: {
      rich_text: RichText[];
    },
    Name: {
      title: RichText[];
    },
    City: {
      rich_text: RichText[];
    },
    Month: {
      select: {
        name: string;
      }
    }
  }
}

export interface UserRecord {
  page_id: string;
  email: string;
  project: string;
  question: string;
  name: string;
  city: string;
};

export async function query_user_by_name( name: string ) : Promise<UserRecord> {
  const response = await getEntityByTitle(process.env.Q24_CONTACT_DATABASE!, "Name", name);
  const record = response?.at(0) as unknown as UserNotionResponse;
  const email = record.properties.Email.email;
  const project = merge_plain_text(record.properties.Project.rich_text);
  const question =  merge_plain_text(record.properties.Question.rich_text);
  const city =  merge_plain_text(record.properties.City.rich_text);
  return {email, project, question, name, city, page_id: record.id};
}

export async function query_user_by_month( month: string ) :Promise<UserRecord[]> {
  const response = await filterSelect(process.env.Q24_CONTACT_DATABASE!, "Month", month);
  const contacts: UserRecord[] = [];
  response?.forEach((res)=> {
    const record = res as unknown as UserNotionResponse;
    const name = merge_plain_text(record.properties.Name.title);
    const email = record.properties.Email.email;
    const project = merge_plain_text(record.properties.Project.rich_text);
    const question =  merge_plain_text(record.properties.Question.rich_text);
    const city =  merge_plain_text(record.properties.City.rich_text);
    contacts.push({email, project, question, name, city, page_id: record.id});
  });
 
  return contacts;
}