import { parseContacts } from "@/lib/utils";
import ContactTable from "@/app/admin/mail-fellow/_components/contactTable";
import MailContent from "@/app/admin/mail-fellow/_components/mailContent";
import SendEmail from "@/app/admin/mail-fellow/_components/sendEmail";

interface Props {
  contacts: string;
  notion_page: string;
}

const PreviewPage = ({ params }: { params: Props }) => {
  const contacts = parseContacts(decodeURIComponent(params.contacts));

  return (
    <main className="px-20">
      <section className="border-blue-600 border-2 mb-6 bg-blue-400">
        <ContactTable contacts={contacts} />
      </section>
      <section className="flex justify-center ">
        <MailContent page_id={params.notion_page} />
      </section>
      <section className="flex justify-center w-full h-10 my-6">
        <SendEmail contacts={contacts} notion_page={params.notion_page} />
      </section>
    </main>
  );
};

export default PreviewPage;
