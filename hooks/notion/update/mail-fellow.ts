import { AmateurEmbed, IdeaEmbed, ToolEmbed } from "@/hooks/backend/request";
import { generate_heading3, generate_textblock_rts, generate_richtext, generate_textblock } from ".";
import { getEntityByTitle } from "../read/database";
import { getContent } from "../read";
import { IBlock } from "../type";

const Q24_TOOL_DATABASE="4a5549aa946d480aab1ee7116c8f6cfc";
const Q24_IDEA_DATABASE="d9cdcaeac64045fcb7b20c18697a40f4";
const Q24_TEMPLATE_FIRST="0b84eb54d5c54d5c8d53ea1f72c83fa9";
const Q24_TEMPLATE_SECOND="3069109e587544119fb71e2fb10006dd";
const Q24_TEMPLATE_THIRD="e5cc1a7c76db40768efdd6fb526243f3";
const Q24_TEMPLATE_FORTH="4b7f334f661b4c32968688c2f6a5c2cf";


export async function update_liandanlu(strategy:string, project:string, question:string) {
  const blocks = await getContent(Q24_TEMPLATE_FIRST, false);
  const liandanlu_idx = blocks.findIndex(obj => obj.type === "callout");
  blocks.splice(liandanlu_idx, 1, ...[
    generate_textblock(`- 你的项目：${project}`) as IBlock,
    generate_textblock(`- 你的问题：${question}`) as IBlock,
    generate_textblock(`- 炼丹炉：${strategy}`) as IBlock
  ]);
  return blocks;
}


interface UrlEntity {
  public_url?: string,
  url: string
};

function get_url( entity:UrlEntity) {
  return entity.public_url || entity.url;
}

async function generate_tool_format(tool_embed: ToolEmbed):Promise<IBlock[]> {
  const result = await getEntityByTitle(Q24_TOOL_DATABASE, "工具名称", tool_embed.tool);
  const url = get_url(result?.at(0) as UrlEntity);
  return [
    generate_heading3(`${tool_embed.tool}`, url) as IBlock,
    generate_textblock(`${tool_embed.description}`) as IBlock,
    generate_textblock(`- 分类：${tool_embed.category}`) as IBlock,
    generate_textblock(`- 价格：CN¥${typeof tool_embed.price === "number" ?
     tool_embed.price.toFixed(2) : "/"}`) as IBlock,
    generate_textblock(`- 从你的问题出发：${tool_embed.query}`) as IBlock,
    generate_textblock(`Soro的话：${tool_embed.explaination}`) as IBlock,
  ];
}

export async function update_tool_template(tool_embed: ToolEmbed) {
  const blocks = await getContent(Q24_TEMPLATE_SECOND, false);
  const tool_idx = blocks.findIndex(obj => obj.type === "callout");
  blocks.splice(tool_idx, 1, ...(await generate_tool_format(tool_embed)));
  return blocks;
}


async function generate_idea_format(idea_embed:IdeaEmbed):Promise<IBlock[]> {
  const result = await getEntityByTitle(Q24_IDEA_DATABASE, "idea", idea_embed.idea);
  const url = get_url(result?.at(0) as UrlEntity);
  return [
    generate_textblock(`另外，我根据当时的问题，「${idea_embed.query}」，为你抽取了一张「灵感卡」。请看！`) as IBlock,
    generate_heading3(`${idea_embed.idea}`, url) as IBlock,
    generate_textblock(`${idea_embed.note}`) as IBlock,
    generate_textblock(``) as IBlock,
    generate_textblock(`${idea_embed.explaination}`) as IBlock,
  ];
}

export async function update_idea_template(idea_embed:IdeaEmbed) {
  const blocks = await getContent(Q24_TEMPLATE_THIRD, false);
  const idea_idx = blocks.findIndex(obj => obj.type === "callout");
  blocks.splice(idea_idx, 1, ...(await generate_idea_format(idea_embed)));
  return blocks;
}

export async function update_amateur_template(amateur_embed:AmateurEmbed) {
  const blocks = await getContent(Q24_TEMPLATE_FORTH, false);
  const amateur_idx = blocks.findIndex(obj => obj.type === "callout");
  blocks.splice(amateur_idx, 1, 
  ...([generate_textblock(`- 你的项目：${amateur_embed.query}`) as IBlock,
    generate_textblock_rts([
     generate_richtext("- 同伴项目："),
     generate_richtext(`${amateur_embed.amateur}`, amateur_embed.notion_url)
    ]) as IBlock,
   generate_textblock(`- 同伴创作者：${amateur_embed.owner}`) as IBlock,
   generate_textblock(`Soro寄语: ${amateur_embed.explaination}`) as IBlock]));
  return blocks;
}




