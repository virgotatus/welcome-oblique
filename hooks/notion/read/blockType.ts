interface Annotations {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  code: boolean;
  color: string;
}

export function to_classname(annotations: Annotations) {
  return `${annotations.bold ? "font-bold":""} ${annotations.italic ? "italic": ""} ${annotations.underline ? "underline": ""} `
}

export interface RichText {
  type: "text"| "equation" | "mention" | "unknown";
  text?: {
    content: string;
    link: string | null;
  }
  mention?: {
    type: "page" | "url";
    page? : {id:string};
  }
  annotations : Annotations
  plain_text: string;
  href: string |null;
}
export const BlockTypes = ["paragraph", "heading_2","heading_3", "bulleted_list_item","numbered_list_item","divider","table", "quote", "image"];

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
    type: "file";
    file: {url: string};
  }
}