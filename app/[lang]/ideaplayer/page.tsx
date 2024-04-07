import { Locale } from "@/i18n-config";
import InputSection from "./_components/InputSection";
import { getDictionary } from "@/get-dictionary";

const IdeaPlayerPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const dictionary = await getDictionary(lang);
  const timeLabel = dictionary.time;
  const placeLabel = dictionary.place;
  const objectLabel = dictionary.object;
  return (
    <>
      <InputSection
        locale={lang}
        timeLabel={timeLabel}
        placeLabel={placeLabel}
        objectLabel={objectLabel}
      />
    </>
  );
};

export default IdeaPlayerPage;
