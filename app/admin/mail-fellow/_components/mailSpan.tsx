import Link from "next/link";
import { RichText } from "@/hooks/notion/blockType";

const MailSpan = ({
  element,
  ele_id,
}: {
  element: RichText;
  ele_id: number;
}) => {
  return (
    <>
      {element.href ? (
        <Link href={element.href} key={`span_${ele_id}`} className="underline">
          {element.plain_text}
        </Link>
      ) : (
        <span key={`span_${ele_id}`}>{element.text?.content}</span>
      )}
    </>
  );
};

export default MailSpan;
