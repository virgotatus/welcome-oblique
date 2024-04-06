import React from "react";
import SharePoster from "./SharePoster";
import PayModal from "./PayModal";
import SendEmail from "./SendEmail";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EndSection = () => {
  return (
    <section id="EndSection" className="mt-16 mb-32">
      <Button className="flex justify-center mx-auto px-6 w-fit" asChild>
        <Link href="/ideaplayer">Back</Link>
      </Button>
      <div className="flex">
        <SharePoster />
        <SendEmail />
        <PayModal />
      </div>
    </section>
  );
};

export default EndSection;
