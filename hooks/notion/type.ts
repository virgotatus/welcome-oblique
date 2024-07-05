interface Annotations {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  code: boolean;
  color: string;
}

export function to_classname(annotations: Annotations) {
  return `${annotations.bold ? " font-bold":""} ${annotations.italic ? " italic": ""} ${annotations.underline ? " underline": ""} 
    ${annotations.color === "yellow_background"? " bg-yellow-600 ": ""}`
}

export interface RichText {
  type: "text"| "equation" | "mention" | "unknown";
  text?: {
    content: string;
    link: { url: string } | null;
  }
  mention?: {
    type: "page" | "url";
    page? : {id:string};
  }
  annotations : Annotations;
  plain_text: string;
  href: string |null;
}

export const RichTextBlockTypes = ["paragraph", "heading_2","heading_3", "bulleted_list_item","numbered_list_item","divider","table", "quote", "image"];
export type TextBlockType = "paragraph" | "heading_2" | "heading_3"| "bulleted_list_item" | "numbered_list_item";

export interface IBlock {
  object: string;
  id: string;
  has_children: boolean;
  type: string;
}

export interface ParagraphBlock extends IBlock {
  type: "paragraph";
  paragraph: {
    rich_text: RichText[];
    color: string;
  };
}

export interface Heading2Block extends IBlock {
  type: "heading_2";
  heading_2: {
    rich_text: RichText[];
    is_toggleable: boolean;
    color: string;
  };
}

export interface Heading3Block extends IBlock {
  type: "heading_3";
  heading_3: {
    rich_text: RichText[];
    is_toggleable: boolean;
    color: string;
  };
}

export interface ListBlock extends IBlock {
  type: "numbered"|"bulleted";
  children: NumberedListBlock[] | BulletedListBlock[];
}

export interface NumberedListBlock extends IBlock {
  type: "numbered_list_item";
  numbered_list_item: {
    rich_text: RichText[];
    color: string;
  }
}

export interface BulletedListBlock extends IBlock {
  type: "bulleted_list_item";
  bulleted_list_item: {
    rich_text: RichText[];
    color: string;
  }
}

export interface Dividor extends IBlock {
  type: "divider";
}

export interface NotionImage extends IBlock {
  type: "image";
  image: {
    type: "file" | "external";
    file?: {url: string};
    external?: {url: string};
  }
}

export interface CalloutSoro extends IBlock {
  type: "callout";
  callout: {
    rich_text: RichText[];
  }
}

export interface ChildPage extends IBlock {
  type: "child_page";
  child_page: {
    title: string;
  }
}