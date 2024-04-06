import React from "react";
import AnswerSection from "../_components/AnswerSection";
import EndSection from "../_components/EndSection";
import prisma from "@/prisma/client";

const IdeaIdPage = async ({ params }: { params: { id: string } }) => {
  const idea = await prisma.ideaplayer.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return (
    <>
      <AnswerSection
        oblique={idea!.oblique}
        description={idea!.answer ? idea?.answer! : ""}
      />
      <EndSection />
    </>
  );
};

export default IdeaIdPage;
