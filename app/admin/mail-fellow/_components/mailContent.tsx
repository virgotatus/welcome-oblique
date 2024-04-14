import { getContent } from "@/hooks/notion/content";
import MailParagraph from "./mailParagraph";

const MailContent = async ({ page_id }: { page_id: string }) => {
  const blocks = await getContent(page_id);

  return (
    <div key={page_id} className="border-red-500 border-2">
      {blocks!.map((block, id) => (
        <MailParagraph key={id} block={block} id={id} />
      ))}
    </div>
  );
};

export default MailContent;
