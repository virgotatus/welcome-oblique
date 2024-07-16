import OneDiSendBtn from "./components/OneDiSendBtn";
import MonthSelect from "./components/monthSelect";
import SoroLists from "./components/soroLists";

const SoroPreview = () => {
  const month = "六月";
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
