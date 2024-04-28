"use client";

import { useFormStatus, useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Contact, sendMail } from "@/actions/mail-fellow";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const initialState = {
  message: "",
};

interface Props {
  contacts: Contact[];
  notion_page: string;
}

export default function SendEmail({ contacts, notion_page }: Props) {
  const { pending } = useFormStatus();
  const sendMailWithParams = sendMail.bind(
    null,
    initialState,
    contacts,
    notion_page
  );
  const [state, formAction] = useFormState(sendMailWithParams, initialState);
  const { toast } = useToast();

  useEffect(() => {
    toast({ title: state?.message, variant: "primary" });
  }, [state]);

  return (
    <form action={formAction}>
      {/* {toast(state?.message)} */}
      <Button
        variant="default"
        className="p-8 text-2xl border-orange-600 border-2 hover:bg-rose-600 hover:transition-colors duration-100"
        type="submit"
        disabled={initialState.message === ""}
      >
        确定发送！
      </Button>
    </form>
  );
}
