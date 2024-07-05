import { cache } from "react";
import { ChildPage, IBlock } from "../type";
import { Notion } from "@/lib/notion/client";
import { APIErrorCode, isNotionClientError, iteratePaginatedAPI } from "@notionhq/client";

async function fetchChildren(block_id:string) :Promise<ChildPage[]> {
  try {
    const blocks:ChildPage[] = [];
    let list_idx = 0;
    for await (const block of iteratePaginatedAPI(Notion.blocks.children.list, {
      block_id: block_id, // A page ID can be passed as a block ID: https://developers.notion.com/docs/working-with-page-content#modeling-content-as-blocks
    })) {
      const iblock = block as IBlock;
      if (iblock.has_children) {
        blocks.push(iblock as ChildPage);
      }
    }
    return blocks;
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      // error is now strongly typed to NotionClientError
      switch (error.code) {
        case APIErrorCode.ObjectNotFound:
          throw new TypeError(`"Notion block object not found error, ${error.code}, ${error.message}`);
        case APIErrorCode.Unauthorized:
          throw new TypeError(`"Notion token error, ${error.code}, ${error.message}`);
        default:
          throw new TypeError(`"Notion error, ${error.code}, ${error.message}`);
      }
    }
    throw new TypeError(`unknown error, ${error}`);
  }
}


export const getChildren = cache(
  async (block_id:string) => {
    return await fetchChildren(block_id)
});