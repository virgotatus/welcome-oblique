import Bgm from "./_components/bgm";
import IdeaFooter from "./footer";
import IdeaHeader from "./header";

const ideaplayerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative bg-orange-300 flex flex-col min-h-screen">
      <Bgm />
      <div className=" max-w-[70ch] ms-auto me-auto flex flex-col justify-center">
        <IdeaHeader />
        <section className="flex-grow  mt-8">{children}</section>
        <div className="absolute inset-x-0 bottom-0 m-auto ">
          <IdeaFooter />
        </div>
      </div>
    </div>
  );
};

export default ideaplayerLayout;
