import OneDiSendBtn from "@/app/admin/mail-fellow/soro-preview/components/OneDiSendBtn";
import MonthSelect from "@/app/admin/mail-fellow/soro-preview/components/monthSelect";
import SoroLists from "@/app/admin/mail-fellow/soro-preview/components/soroLists";

interface Props {
  month: string;
}

const SoroPreview = ({ params }: { params: Props }) => {
  const month = decodeURIComponent(params.month);
  return (
    <div className="px-20">
      <section>
        <MonthSelect month={month} />
      </section>
      <section className="border-blue-600 border-2 mb-6 ">
        <SoroLists month={month} />
      </section>
      <section className="flex flex-row space-x-4 justify-center w-full h-10 my-6">
        <OneDiSendBtn month={month} />
      </section>
    </div>
  );
};

export default SoroPreview;
