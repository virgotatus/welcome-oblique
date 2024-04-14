"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="default"
      className="p-8 text-2xl border-orange-600 border-2 hover:bg-rose-600 hover:transition-colors duration-100"
      type="submit"
      disabled={pending}
    >
      确定发送！
    </Button>
  );
}
