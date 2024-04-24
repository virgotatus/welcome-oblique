"use client";
import { RefObject, useRef } from "react";

interface Answer {
  oblique: string;
  description: string;
}

function showText(
  target: RefObject<HTMLSpanElement>,
  message: string,
  index: number
) {
  if (index < message.length) {
    const interval = Math.floor(Math.random() * 100 + 30);
    target.current?.append(message[index++]);
    setTimeout(function () {
      showText(target, message, index);
    }, interval);
  }
}

const AnswerSection = ({ oblique, description }: Answer) => {
  const answerRef = useRef<HTMLSpanElement>(null);

  if (!answerRef.current) {
    setTimeout(function () {
      showText(answerRef, description, 0);
    }, 240);
  }

  return (
    <section id="answer-show" className="text-center">
      <p id="answer-container">
        <strong>灵感(Oblique Strategies):</strong>
        <span id="oblique" className="italic">
          {"  "}
          {oblique}
        </span>
        <br />
        <strong>丹文(Description):</strong>
        <span ref={answerRef} id="answer" className=" whitespace-pre-line">
          {""}
        </span>
        <br />
      </p>
    </section>
  );
};

export default AnswerSection;
