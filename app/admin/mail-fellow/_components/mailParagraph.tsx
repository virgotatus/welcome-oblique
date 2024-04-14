import { IBlock, RichText, ListBlock } from "@/hooks/notion/blockType";
import { getRichTextsFromBlock } from "@/hooks/notion/content";
import MailSpan from "./mailSpan";

const MailParagraph = ({ block, id }: { block: IBlock; id: number }) => {
  const richTexts: RichText[] = getRichTextsFromBlock(block);
  // return the corresponding html element based on the block type
  switch (block.type) {
    case "paragraph":
      return (
        <div key={`para_${id}`}>
          {richTexts?.length === 0 ? (
            <br></br>
          ) : (
            richTexts?.map((element, ele_id) => (
              <MailSpan key={ele_id} element={element} ele_id={ele_id} />
            ))
          )}
        </div>
      );
    case "heading_2":
      return (
        <h2 key={`h2_${id}`}>
          {<MailSpan element={richTexts!.at(0)!} ele_id={0} />}
        </h2>
      );
    case "heading_3":
      return (
        <h3 key={`h3_${id}`}>
          {<MailSpan element={richTexts!.at(0)!} ele_id={0} />}
        </h3>
      );
    case "numbered_list_item" || "bulleted_list_item":
      return richTexts?.map((element, ele_id) => (
        <MailSpan key={ele_id} element={element} ele_id={ele_id} />
      ));
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
  }
};

export default MailParagraph;
