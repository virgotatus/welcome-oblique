import { Notion } from "@/lib/notion/client";
import { APIErrorCode, isNotionClientError } from "@notionhq/client";
import { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints";

interface TextBlock {
  object: "block";
  type: "paragraph"| "heading2";
  paragraph?: {
    rich_text: [
      {
        type: "text";
        text: {
          content: string;
        }
      }
    ]
  }
  heading2?: {
    rich_text: [
    {
      type: "text";
      text: {
        content: string;
      }
    }
  ]
}
}

export async function generateTextBlock(content: string): Promise<TextBlock> {
  return {
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: [
        {
          type: "text",
          text: {
            content: content,
          }
        },
      ],
    },
  };
}

interface Props {
  parent_id: string;
  title: string;
  children?: TextBlock[];
}

export async function createPage({parent_id, title, children}: Props) {
  try {
    const response = (await Notion.pages.create(
      {
        parent: {
          type: "page_id",
          page_id: parent_id,
        },
        properties: {
          title: [
            {
              text: {
                content: title,
              }
            }
          ],
        },
        children: children as BlockObjectRequest[],
      }
    ))
    return response.id;
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
          console.log(error.message);
      }
    }
  }
}
