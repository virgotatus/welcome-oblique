import Link from "next/link";
import { getContent, getRichTextsFromBlock } from "@/hooks/notion/read";
import {
  IBlock,
  RichText,
  ListBlock,
  to_classname,
  NotionImage,
} from "@/hooks/notion/type";
import { mentionLink } from "@/utils/mail-fellow";

const MailSpan = ({
  element,
  ele_id,
}: {
  element: RichText;
  ele_id: number;
}) => {
  return (
    <>
      {element.href ? (
        <Link
          key={`span_${ele_id}`}
          href={mentionLink(element.href)}
          className={to_classname(element.annotations)}
        >
          {element.plain_text}
        </Link>
      ) : (
        <span
          key={`span_${ele_id}`}
          className={to_classname(element.annotations)}
        >
          {element.plain_text}
        </span>
      )}
    </>
  );
};

const mergeRichText = (richTexts: RichText[]) => {
  return richTexts.length === 0 ? (
    <br></br>
  ) : (
    richTexts?.map((element, ele_id) => (
      <MailSpan key={ele_id} element={element} ele_id={ele_id} />
    ))
  );
};

const MailParagraph = ({ block, id }: { block: IBlock; id: number }) => {
  // return the corresponding html element based on the block type
  switch (block.type) {
    case "image":
      const img = block as NotionImage;
      return (
        <img
          src={
            img.image.type === "file"
              ? img.image.file?.url
              : img.image.external?.url
          }
          alt={`image_${block.id}`}
        />
      );
    case "paragraph":
      return (
        <div key={`para_${id}`} className=" whitespace-pre-wrap">
          {mergeRichText(getRichTextsFromBlock(block))}
        </div>
      );
    case "heading_2":
      return (
        <h2 key={`h2_${id}`}>{mergeRichText(getRichTextsFromBlock(block))}</h2>
      );
    case "heading_3":
      return (
        <h3 key={`h3_${id}`}>{mergeRichText(getRichTextsFromBlock(block))}</h3>
      );
    case "numbered_list_item":
    case "bulleted_list_item":
      return mergeRichText(getRichTextsFromBlock(block));
    case "numbered":
      return (
        <ol key={`ol_${id}`}>
          {(block as ListBlock).children.map((listblock, list_id) => (
            <li key={`li_${list_id}`}>
              <MailParagraph block={listblock} id={list_id} />
            </li>
          ))}
        </ol>
      );
    case "bulleted":
      console.log("bullet items counts:", (block as ListBlock).children.length);
      return (
        <ul key={`ul_${id}`}>
          {(block as ListBlock).children.map((listblock, list_id) => (
            <li key={`li_${list_id}`}>
              <MailParagraph block={listblock} id={list_id} />
            </li>
          ))}
        </ul>
      );
    case "divider":
      return <hr></hr>;
    case "quote":
      return (
        <blockquote className="ml-4 indent-2 italic border-l-4 text-neutral-700 border-neutral-800">
          {mergeRichText(getRichTextsFromBlock(block))}
        </blockquote>
      );
    default:
      throw new TypeError(`MailParagraph Unknown block type: ${block.type}`);
  }
};

const MailContent = async ({ page_id }: { page_id: string }) => {
  const blocks = await getContent(page_id);
  return (
    <div key={page_id} className="border-red-500 border-2">
      {blocks!.map((block, id) => (
        <MailParagraph key={id} block={block} id={id} />
      ))}
    </div>
  );
};

export default MailContent;
