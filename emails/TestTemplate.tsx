"use client";
import React, { CSSProperties } from "react";
import { Html, Button, Preview, Tailwind } from "@react-email/components";

const TestTemplate = ({ text }: { text: string }) => {
  return (
    <Html>
      <Tailwind>
        <Button
          href="http://asky.ideaplayer.shop"
          className="btn btn-primary bg-slate-200"
        >
          炼丹
        </Button>
        <Preview>{text}</Preview>
      </Tailwind>
    </Html>
  );
};

const bodyCSS: CSSProperties = {
  background: "#fff",
  color: "#000",
  fontFamily: "Helvetica",
  fontSize: "16px",
  lineHeight: "1.5",
};

export default TestTemplate;
