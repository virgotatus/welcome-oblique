import {
  IBlock,
  ListBlock,
  RichText,
  to_classname,
} from "@/hooks/notion/blockType";
import { getContent, getRichTextsFromBlock } from "@/hooks/notion/content";
import { cn, mentionLink } from "@/lib/utils";
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
} from "@react-email/components";

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
              " text-[#004dcf]",
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

const Paragraph = ({ block, id }: { block: IBlock; id: number }) => {
  const richTexts: RichText[] = getRichTextsFromBlock(block);
  // return the corresponding html element based on the block type
  switch (block.type) {
    case "paragraph":
      return (
        <Text style={paragraph} key={`para_${id}`}>
          {richTexts?.length === 0 ? (
            <br />
          ) : (
            richTexts?.map((element, ele_id) => (
              <Span ele_id={ele_id} key={ele_id} element={element} />
            ))
          )}
        </Text>
      );
    case "heading_2":
      return (
        <Heading as="h2">
          {<Span element={richTexts!.at(0)!} ele_id={0} />}
        </Heading>
      );
    case "heading_3":
      return (
        <Heading as="h3">
          {<Span element={richTexts!.at(0)!} ele_id={0} />}
        </Heading>
      );
    case "numbered_list_item" || "bulleted_list_item":
      return (
        <Text style={paragraph}>
          {richTexts?.map((element, ele_id) => (
            <Span key={ele_id} ele_id={ele_id} element={element} />
          ))}
        </Text>
      );
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
  }
};

export const MailFellowEmail = async (notion_page: string) => {
  const blocks = await getContent(notion_page);
  return (
    <Html>
      <Head />
      <Body style={main}>
        {/* <Container style={container}>
            <Section style={box}> */}
        {blocks!.map((block, id) => (
          <Paragraph block={block} id={id} />
        ))}
        {/* </Section>
          </Container> */}
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
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  // color: "#525f7f",
  color: "#000000",
  whiteSpace: "pre-line",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  marginTop: "4px",
  marginBottom: "2px",
};

const footer = {
  color: "#8898aa",
  fontSize: "18px",
  lineHeight: "16px",
};
