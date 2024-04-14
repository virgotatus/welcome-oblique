import { parseReceivers } from "@/lib/utils";
import { sendMail } from "@/actions/mail-fellow";
import ReceiverTable from "@/app/admin/mail-fellow/_components/receiverTable";
import MailContent from "@/app/admin/mail-fellow/_components/mailContent";
import SubmitButton from "@/app/admin/mail-fellow/_components/sendEmail";

interface Props {
  receivers: string;
  notion_page: string;
}

const PreviewPage = ({ params }: { params: Props }) => {
  const receivers = parseReceivers(decodeURIComponent(params.receivers));

  const sendMailWithParams = sendMail.bind(null, receivers, params.notion_page);

  return (
    <main className="px-20">
      <section className="border-blue-600 border-2 mb-6">
        <ReceiverTable receivers={receivers} />
      </section>
      <section className="flex justify-center ">
        <MailContent page_id={params.notion_page} />
      </section>
      <section className="flex justify-center w-full h-10 my-6">
        <form action={sendMailWithParams}>
          <SubmitButton />
        </form>
      </section>
    </main>
  );
};

export default PreviewPage;
