import AnswerSection from "../../_components/AnswerSection";
import EndSection from "../../_components/EndSection";
import prisma from "@/prisma/client";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

const IdeaIdPage = async ({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) => {
  const dictionary = await getDictionary(lang);
  const idea = await prisma.ideaplayer.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      oblique: true,
      answer: true,
    },
  });

  return (
    <>
      <AnswerSection
        oblique={idea!.oblique}
        description={idea!.answer ? idea?.answer! : ""}
      />
      <EndSection
        backLabel={dictionary.back}
        posterLabel={dictionary.poster}
        payLabel={dictionary.fee}
      />
    </>
  );
};

export default IdeaIdPage;
