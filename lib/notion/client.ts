import { Client } from "@notionhq/client";
// Initializing a client
export const Notion = new Client({
  auth: process.env.NOTION_API_KEY,
});