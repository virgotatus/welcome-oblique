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

import { IdeaResult } from "@/actions/ideaplayer";

export const IdeaEmail = (result: IdeaResult) => {
  return (
    <Html>
      <Head />
      <Heading as="h1">欢迎来到灵感炼丹炉, 你的生成灵感是：</Heading>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={paragraph}>时间：{result.query.createtime}</Text>
            <Text style={paragraph}>场景：{result.query.place}</Text>
            <Text style={paragraph}>物品：{result.query.obj}</Text>
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
            <Button style={button} href="https://ling.liandanlu.xyz/ideaplayer">
              想再试试？
            </Button>
            <Hr style={hr} />
            谢谢, 祝你心想事成~ ps.邮件可恢复。
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default IdeaEmail;

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
