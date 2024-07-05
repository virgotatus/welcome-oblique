import { RichText, TextBlockType } from "../type";

// 重构！！
interface TextBlock {
  object: "block";
  type: TextBlockType;
  paragraph?: {
    rich_text: RichText[]
  }
  heading_2?: {
    rich_text: RichText[]
  }
  heading_3?: {
    rich_text: RichText[]
  }
}

export function generate_richtext(content:string, link?:string): RichText {
  return ({
    type: "text",
    text: {
      content: content,
      link: link ? {url: link} : null,
    },
    annotations : {
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      code: false,
      color: "default",
    },
    plain_text: content,
    href: link? link: null,
  })
}

export function generate_textblock(content: string, link?:string): TextBlock {
  return {
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: [
        generate_richtext(content, link)
      ],
    },
  };
}


export function generate_heading3(content: string, link?:string): TextBlock {
  return {
    object: "block",
    type: "heading_3",
    heading_3: {
      rich_text: [
        generate_richtext(content, link)
      ],
    },
  };
}

export function generate_textblock_rts(rts: RichText[]): TextBlock {
  return {
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: rts
    },
  };
}