import {
  Body,
  Heading,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Section,
  Text,
} from "@react-email/components";

import { LingResult } from "@/actions/ling";

export const LingWelcomeEmail = (result: LingResult) => {
  return (
    <Html>
      <Head />
      {/* <Heading as="h1">欢迎来到灵买小镇, 这是你的入会登记</Heading> */}
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={paragraph}>Hi {result.query.username},</Text>
            <Text style={paragraph}>
              在 {result.query.createtime}，你搬进了灵感买家俱乐部的
              {result.query.place}，带着这样一个问题： {result.query.question}
            </Text>

            <Hr style={hr} />
            <Text style={paragraph}>
              以下是灵感炼丹炉给出的一些提示，希望能带来一些帮助。
              <br />
              <br />
              灵感：{result.oblique} <br />
              <br />
              丹文：
            </Text>
            <Text
              style={paragraph}
              dangerouslySetInnerHTML={{
                __html: result.answer.replaceAll("\n", "<br/>"),
              }}
            ></Text>
            <br />
            {/* <Text style={paragraph}>附件有你的专属机票，请查收和分享～</Text> */}
            <Button style={button} href="https://ling.liandanlu.xyz">
              想再试试？
            </Button>
            <Hr style={hr} />
            <Text style={footer}>
              感谢@脑八的脑洞题，@鲍勃的新年愿望，@Elon的灵感炼丹炉，@夜游船的甲板，@你的参与和宇宙的运转。ps:支持回复邮件。
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default LingWelcomeEmail;

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

const paragraph = {
  color: "#525f7f",
  whiteSpace: "pre-line",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const button = {
  backgroundColor: "#656ee8",
  padding: "10px 10px",
  borderRadius: "10px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100px",
  margin: "auto",
  height: "auto",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
