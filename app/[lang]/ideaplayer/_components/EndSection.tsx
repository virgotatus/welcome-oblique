import { Button } from "@/components/ui/button";
import Link from "next/link";
import SharePoster from "./SharePoster";
import PayModal from "./PayModal";
import SendEmail from "./SendEmail";

interface LabelProps {
  backLabel: string;
  posterLabel: string;
  payLabel: string;
}

const EndSection = ({ backLabel, posterLabel, payLabel }: LabelProps) => {
  return (
    <section id="EndSection" className="mt-16 mb-32">
      <Button className="flex justify-center mx-auto px-6 w-fit" asChild>
        <Link href="/ideaplayer">{backLabel}</Link>
      </Button>

      <SendEmail />
      <div className="flex flex-row ">
        <SharePoster label={posterLabel} />
        <PayModal label={payLabel} />
      </div>
    </section>
  );
};

export default EndSection;
