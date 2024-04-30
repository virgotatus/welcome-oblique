import prisma from "@/prisma/client";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnswerSection from "@/app/[lang]/ideaplayer/_components/AnswerSection";
import SendEmail from "@/app/[lang]/ideaplayer/_components/SendEmail";
import SharePoster from "@/app/[lang]/ideaplayer/_components/SharePoster";
import PayModal from "@/app/[lang]/ideaplayer/_components/PayModal";

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
  });

  return (
    <>
      <AnswerSection
        oblique={idea!.oblique}
        description={idea!.answer ? idea?.answer! : ""}
      />
      <section id="EndSection" className="mt-16 mb-32">
        <Button className="mx-auto px-6 py-4 w-fit flex justify-center" asChild>
          <Link href="/ideaplayer">{dictionary.back}</Link>
        </Button>
        <div className="flex flex-row gap-6 mx-auto px-6 py-3 w-fit justify-center items-center">
          <SendEmail />
          <SharePoster label={dictionary.poster} />
          <PayModal label={dictionary.fee} />
        </div>
      </section>
    </>
  );
};

export default IdeaIdPage;
