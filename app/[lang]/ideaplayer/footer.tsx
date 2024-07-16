import prisma from "@/prisma/client";

const IdeaFooter = async () => {
  const counts =
    (await prisma.ideaplayer.count()) + (await prisma.ling.count());
  return (
    <footer className="footer-center gap-y-2 mt-12 mb-2 text-center text-gray-700">
      <div className="">
        已给出灵感(Served Ideas):{" "}
        <span className="italic font-semibold">
          {"  "}
          {counts}
        </span>
      </div>
      <div className="p-2 m-0 justify-between">
        <a
          href="https://mp.weixin.qq.com/s/BTK111M6iangsNeTNujkzA"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Manual
        </a>
        {<b> · </b>} Project by{" "}
        <a
          href="https://elon.liandanlu.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Elon Gong
        </a>
        {<b> · </b>} Fork on{" "}
        <a
          href="https://github.com/virgotatus/askGPT3"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Github
        </a>
      </div>
    </footer>
  );
};

export default IdeaFooter;
