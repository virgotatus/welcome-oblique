interface Answer {
  oblique: string;
  description: string;
}

const AnswerSection = ({ oblique, description }: Answer) => {
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
        <span id="answer" className=" whitespace-pre-line">
          {description}
        </span>
        <br />
      </p>
    </section>
  );
};

export default AnswerSection;
