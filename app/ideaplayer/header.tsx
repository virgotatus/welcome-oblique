import Image from "next/image";
import HeaderImage from "@/public/ideaplayer/header.webp";

const IdeaHeader = () => {
  return (
    <header className="text-center flex flex-col justify-center">
      <a
        href="https://crm.org/articles/brian-eno-oblique-strategies"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          alt="Brian Eno"
          src={HeaderImage}
          className="inline h-48 w-[320px] max-h-56 mb-2 shadow rounded-lg"
        />
      </a>
      <h1 className="text-2xl font-bold mb-2">灵感炼丹炉</h1>
      <h1 className="text-2xl font-bold mb-1">stochastic idea player</h1>
      <p className="block text-lg text-neutral-600">
        Oblique Strategies: a set of axioms, transcribed onto cue cards and
        derived from the Chinese Divination system, the I Ching.
      </p>
    </header>
  );
};

export default IdeaHeader;
