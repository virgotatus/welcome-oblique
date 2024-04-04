import { Button } from "@/components/ui/button";
import { MdAttachEmail } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";

const SendEmail = () => {
  return (
    <div
      className="border-1 mt-4 flex w-1/2 justify-center m-auto
      rounded-md border-solid bg-white p-0.5 shadow-lg "
    >
      <input
        className="rounded-md grow px-8  focus:outline-none"
        placeholder="youremail@email.com"
      />
      <Button
        variant="outline"
        className="inline-flex rounded-md p-2  items-center"
      >
        <MdAttachEmail fill="black" />
        <span>{" Email"}</span>
      </Button>
    </div>
  );
};

export default SendEmail;
