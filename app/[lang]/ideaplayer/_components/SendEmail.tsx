"use client";
import { Button } from "@/components/ui/button";
import { MdAttachEmail } from "react-icons/md";
import { ideaEmail } from "@/actions/ideaplayer";
import { useFormStatus } from "react-dom";
import { useParams } from "next/navigation";

const SendEmail = () => {
  const { pending } = useFormStatus();
  const params = useParams<{ id: string }>();
  const sendEmail = ideaEmail.bind(null, Number(params.id));
  return (
    <form action={sendEmail}>
      <div
        className="border-1 mt-4 flex justify-center m-auto
      rounded-md border-solid bg-white p-0.5 shadow-lg "
      >
        <input
          type="email_addr"
          name="email_addr"
          className="rounded-md grow px-8 focus:outline-none"
          placeholder="youremail@email.com"
        />
        <Button
          type="submit"
          disabled={pending}
          variant="outline"
          className="inline-flex rounded-md p-2  items-center"
        >
          <MdAttachEmail fill="black" />
          <span>{" Email"}</span>
        </Button>
      </div>
    </form>
  );
};

export default SendEmail;
