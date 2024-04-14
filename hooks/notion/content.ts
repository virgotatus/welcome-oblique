import { cache } from "react";
import { isNotionClientError, APIErrorCode, iteratePaginatedAPI } from "@notionhq/client";
import { RichText, BlockTypes, IBlock, ParagraphBlock, Heading2Block, Heading3Block, NumberedListBlock, Dividor, BulletedListBlock, ListBlock } from "./blockType";
import { Notion } from "@/lib/notion/client";
// refer to https://github.com/makenotion/notion-sdk-js/blob/main/examples/parse-text-from-any-block-type/index.js


const getPlainTextFromRichText = (richText : RichText[]) => {
  return richText.map(t => t.plain_text).join("")
  // Note: A page mention will return "Undefined" as the page name if the page has not been shared with the integration. See: https://developers.notion.com/reference/block#mention
}

// Get the plain text from any block type supported by the public API.
export const getRichTextsFromBlock = (block:any): RichText[] => {
  let text
  // Get rich text from blocks that support it
  if (BlockTypes.includes(block.type)) {
    // This will be an empty string if it's an empty line.
    return block[block.type].rich_text as RichText[];
  }
  // Get text for block types that don't have rich text
  else {
    switch (block.type) {
      case "unsupported":
        // The public API does not support all block types yet
        text = "[Unsupported block type]"
        break
      case "child_database":
        text = block.child_database.title
        // Use "Query a database" endpoint to get db rows: https://developers.notion.com/reference/post-database-query
        // Use "Retrieve a database" endpoint to get additional properties: https://developers.notion.com/reference/retrieve-a-database
        break
      case "child_page":
        text = block.child_page.title
        break
      case "embed":
      case "video":
      case "file":
      case "image":
      case "pdf":
        text = "media"
        break
      case "equation":
        text = block.equation.expression
        break
      case "link_preview":
        text = block.link_preview.url
        break
      case "synced_block":
        // Provides ID for block it's synced with.
        text = block.synced_block.synced_from
          ? "This block is synced with a block with the following ID: " +
            block.synced_block.synced_from[block.synced_block.synced_from.type]
          : "Source sync block that another blocked is synced with."
        break
      case "table":
        // Only contains table properties.
        // Fetch children blocks for more details.
        text = "Table width: " + block.table.table_width
        break
      case "table_of_contents":
        // Does not include text from ToC; just the color
        text = "ToC color: " + block.table_of_contents.color
        break
      case "breadcrumb":
      case "column_list":
      case "divider":
        text = "Divider"
        break
      case "numbered":
      case "bulleted":
        text = "listed"
        break
      default:
        text = "[Unknown block type]"
        break
    }
  }
  // Blocks with the has_children property will require fetching the child blocks. (Not included in this example.)
  // e.g. nested bulleted lists
  if (block.has_children) {
    // For now, we'll just flag there are children blocks.
    text = text + " (Has children)"
  }
  // Includes block type for readability. Update formatting as needed.
  const raiseRichText : RichText[] =  [{
    plain_text:text, type: block.type,
    href: null
  }]
  return raiseRichText;
}

const replaceListsItem = (blocks: IBlock[], 
  list_type:"bulleted_list_item"|"numbered_list_item"
) => {
  let i = 0;
  while (i < blocks.length) {
    if (blocks[i].type === list_type  ) {
      let j = i + 1;
      while (
        j < blocks.length &&
        blocks[j].type === list_type
      ) {
        j++;
      }

      const bulletedListItems = blocks.slice(i, j);
      blocks.splice(i, j - i, {
        type: list_type.slice(0,8),
        children: bulletedListItems,
      } as ListBlock);
    } else {
      i++;
    }
  }
  return blocks;
};

async function fetchContent(block_id:string) :Promise<IBlock[]|undefined> {
  try {
    const blocks:IBlock[] = [];
    let list_idx = 0;
    for await (const block of iteratePaginatedAPI(Notion.blocks.children.list, {
      block_id: block_id, // A page ID can be passed as a block ID: https://developers.notion.com/docs/working-with-page-content#modeling-content-as-blocks
    })) {
      const iblock = block as IBlock;
      switch (iblock.type) {
        case "paragraph":
          blocks.push(iblock as ParagraphBlock);
          break;
        case "heading_2":
          blocks.push(iblock as Heading2Block);
          break;
        case "heading_3":
          blocks.push(iblock as Heading3Block);
          break;
        case "numbered_list_item":
          list_idx = blocks.length + 1 ;
          blocks.push(iblock as NumberedListBlock);
          break;
        case "bulleted_list_item":
            blocks.push(iblock as BulletedListBlock);
            break;
        case "divider":
          blocks.push(iblock as Dividor);
          break;
        default :
          blocks.push(iblock);
          throw ("Notion block type parse error");
      }
    }
    // replace list item
    return replaceListsItem(replaceListsItem(blocks, "numbered_list_item"),"bulleted_list_item");
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

export const getContent = cache(
  async (block_id:string) => {
    return await fetchContent(block_id)
});