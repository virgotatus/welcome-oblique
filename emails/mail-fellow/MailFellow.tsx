import {
  IBlock,
  ListBlock,
  NotionImage,
  RichText,
  to_classname,
} from "@/hooks/notion/type";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Section,
  Text,
  Tailwind,
  Link,
  Heading,
  Row,
} from "@react-email/components";
import { getRichTextsFromBlock } from "@/hooks/notion/read";
import { cn } from "@/lib/utils";
import { mentionLink } from "@/utils/mail-fellow";

interface SideCardProps {
  place: string;
  username: string;
  createtime: string;
  seat: string;
  children: React.ReactNode;
}

const SideCard = ({
  place,
  username,
  createtime,
  seat,
  children,
}: SideCardProps) => {
  return (
    <Tailwind>
      <Head></Head>
      <div className="aspect-[5/9] w-full bg-[#EEEEEE]/40 flex relative items-center justify-center">
        <Img
          src="https://s2.loli.net/2023/12/30/6OBC8jzTwMK1niD.png"
          alt="ticket"
          className="w-full ml-2 md:ml-8 mt-2"
        />
        <p className="top-[89px] left-[380px] text-center w-[100px] absolute font-bold text-2xl">
          {place}
        </p>
        <p className="top-[199px] left-[80px] text-center w-[100px] absolute font-bold text-xl">
          {username}
        </p>
        <p className="top-[199px] left-[230px] text-center absolute w-[140px] font-bold text-xl">
          {createtime}
        </p>
        <p className="top-[199px] left-[400px] text-center absolute w-[80px] font-bold text-xl">
          {seat}
        </p>
        {children}
      </div>
    </Tailwind>
  );
};

const Span = ({ element, ele_id }: { element: RichText; ele_id: number }) => {
  return (
    <>
      <Tailwind>
        {element.href ? (
          <Link
            key={`span_${ele_id}`}
            href={mentionLink(element.href)}
            className={cn([
              to_classname(element.annotations),
              " text-[#004dcf] underline",
            ])}
          >
            {element.plain_text}
          </Link>
        ) : (
          <Tailwind>
            <span
              key={`span_${ele_id}`}
              className={to_classname(element.annotations)}
            >
              {element.plain_text}
            </span>
          </Tailwind>
        )}
      </Tailwind>
    </>
  );
};

const mergeRichText = (richTexts: RichText[]) => {
  return richTexts?.length === 0
    ? ` `
    : richTexts?.map((element, ele_id) => (
        <Span ele_id={ele_id} key={ele_id} element={element} />
      ));
};

const Paragraph = ({ block, id }: { block: IBlock; id: number }) => {
  // return the corresponding html element based on the block type
  switch (block.type) {
    case "image":
      const img = block as NotionImage;
      return (
        <Img
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
        <Text style={paragraph} key={`para_${id}`}>
          {mergeRichText(getRichTextsFromBlock(block))}
        </Text>
      );
    case "heading_2":
      return (
        <Heading as="h2" key={`h2_${id}`}>
          {mergeRichText(getRichTextsFromBlock(block))}
        </Heading>
      );
    case "heading_3":
      return (
        <Heading as="h3" key={`h3_${id}`}>
          {mergeRichText(getRichTextsFromBlock(block))}
        </Heading>
      );
    case "numbered_list_item":
    case "bulleted_list_item":
      return mergeRichText(getRichTextsFromBlock(block));
    case "numbered":
      return (
        <ol key={`ol_${id}`}>
          {(block as ListBlock).children.map((listblock, list_id) => (
            <li key={`li_${list_id}`}>
              <Paragraph block={listblock} id={list_id} />
            </li>
          ))}
        </ol>
      );
    case "bulleted":
      return (
        <ul key={`ul_${id}`}>
          {(block as ListBlock).children.map((listblock, list_id) => (
            <li key={`li_${list_id}`}>
              <Paragraph block={listblock} id={list_id} />
            </li>
          ))}
        </ul>
      );
    case "divider":
      return <Hr style={hr} />;
    case "quote":
      return (
        <blockquote style={quote}>
          {mergeRichText(getRichTextsFromBlock(block))}
        </blockquote>
      );
  }
};

export const MailFellowEmail = (blocks: IBlock[]) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        {/* <Container style={container}> <Section style={box}>*/}
        {blocks!.map((block, id) => (
          <Paragraph block={block} id={id} />
        ))}
        {/*</Section>  </Container> */}
      </Body>
    </Html>
  );
};

export default MailFellowEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0 0 0",
  marginBottom: "0",
};

const box = {
  padding: "0 0px",
  marginBottom: "2px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  // color: "#525f7f",
  color: "#000000",
  whiteSpace: "pre-wrap", // note! 保留空白符和正常换行
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  marginBottom: "2px",
};

const footer = {
  color: "#8898aa",
  fontSize: "18px",
  lineHeight: "16px",
};

// "ml-4 indent-2 italic border-l-4 text-neutral-700 border-neutral-800"
const quote = {
  ...paragraph,
  marginLeft: "1rem",
  textIndent: "0.5rem",
  italic: true,
  borderLeft: "4px solid #262626",
  color: "#404040",
};
