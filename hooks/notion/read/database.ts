import { cache } from "react";
import { isNotionClientError, APIErrorCode } from "@notionhq/client";
import { Notion } from "@/lib/notion/client";


async function filterTitle(database_id: string, title_name:string, entity:string) {
  try {
    const response = (await Notion.databases.query(
      {
        database_id: database_id,
        filter: {
          property: title_name,
          title: {
            equals: entity,
          }
        }
      }
    )) ;
    return response.results;
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


export const getEntityByTitle = cache(
  async (database_id: string, title_name:string, entity:string) => {
    return await filterTitle(database_id, title_name, entity);
  }
);


export async function filterSelect(database_id: string, select_name:string, entity:string) {
  try {
    const response = (await Notion.databases.query(
      {
        database_id: database_id,
        filter: {
          property: select_name,
          select: {
            equals: entity,
          }
        }
      }
    )) ;
    return response.results;
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