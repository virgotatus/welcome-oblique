import {
  Body,
  Heading,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

import { AIResult } from "@/app/api/route";
import { Places } from "@/app/api/tallyField";

const Seat = ["TGT", "PGT", "RBH"];

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

export const LingSchoolEmail = (result: AIResult) => {
  const seatNumber = String(result.id).padStart(3, "0"); // '0001'
  const placeTag =
    Seat[Places.findIndex((place) => place === result.query.place)];
  const resultArray = result.answer.split("\n\n");
  const filteredResultArray = resultArray.filter((item) => item.length > 0);
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <SideCard
              place={result.query.place}
              username={result.query.username}
              createtime={result.query.createtime}
              seat={placeTag + " " + seatNumber}
            >
              <p className="top-[299px] left-[50px] text-start absolute w-[340px] font-normal text-lg">
                灵感
                <br />
                {result.oblique}
              </p>
              <p className="top-[379px] left-[50px] text-start absolute w-[340px] font-normal text-lg">
                丹文
                <br />
                <span
                  dangerouslySetInnerHTML={{
                    __html: filteredResultArray[0].replaceAll("\n", "<br/>"),
                  }}
                />
              </p>
            </SideCard>
            <SideCard
              place={result.query.place}
              username={result.query.username}
              createtime={result.query.createtime}
              seat={placeTag + " " + seatNumber}
            >
              <p
                className="top-[299px] left-[50px] text-start absolute w-[340px] font-normal text-md leading-snug whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: filteredResultArray[1].replaceAll("\n", "<br/>"),
                }}
              />
            </SideCard>
            <Tailwind>
              <div className="mt-4 flex justify-center">
                <Button
                  className="btn bg-stone-800 p-[10px] rounded-lg text-white font-bold text-center w-[100px] m-auto h-auto"
                  href="http://asky.ideaplayer.shop"
                >
                  还想炼丹？
                </Button>
              </div>
            </Tailwind>
            <Hr style={hr} />
            <Text style={footer}>
              感谢@脑八的脑洞题，@鲍勃的新年愿望，@Elon的灵感炼丹炉，@夜游船的甲板，@你的参与和宇宙的运转。ps:
              可以回复邮件。
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default LingSchoolEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 32px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};