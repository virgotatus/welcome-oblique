import { cache } from "react";
import { isNotionClientError, APIErrorCode } from "@notionhq/client";
import { Notion } from "@/lib/notion/client";

interface NotionPageProperty {
  object: []
  type: string;
  results : [
    {
      [prop: string]: {
        plain_text: string;
        href: string | null;
      }
    }
  ]
}

async function fetchProperty(page_id: string, property_id:string) {
  try {
    const response = (await Notion.pages.properties.retrieve(
      {
        property_id: property_id,
        page_id: page_id,
        page_size: 100,
      }
    )) as unknown as NotionPageProperty;
    if ("results" in response) {
      if (property_id in response.results[0]) {
        return response.results[0][property_id].plain_text
      }
    }
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      // error is now strongly typed to NotionClientError
      switch (error.code) {
        case APIErrorCode.ObjectNotFound:
          // ...
          break
        case APIErrorCode.Unauthorized:
          // ...
          break
        // ...
        default:
          // you could even take advantage of exhaustiveness checking
          // assertNever(error.code)
      }
    }
  }
}

export const getProperty = cache(
  async (page_id: string, property_id:string) => {
    return await fetchProperty(page_id, property_id)
  }
);