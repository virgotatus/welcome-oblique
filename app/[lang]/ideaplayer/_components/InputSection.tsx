import moment from "moment";
import { ideaSubmit } from "@/actions/ideaplayer";
import { InputSubmit, InputWithBgm } from "./InputWidgets";

interface LabelProps {
  timeLabel: string;
  placeLabel: string;
  objectLabel: string;
  locale: string;
}

const InputSection = ({
  timeLabel,
  placeLabel,
  objectLabel,
  locale,
}: LabelProps) => {
  const ideaSubmitWith = ideaSubmit.bind(null);

  return (
    <>
      <form action={ideaSubmitWith}>
        <div className="flex justify-center items-center mb-5">
          <input
            type="locale"
            name="locale"
            defaultValue={locale}
            className="hidden"
          />
          <label className="text-lg">{timeLabel} ：</label>
          <input
            type="gtime"
            name="gtime"
            value={moment().format("Y/M/D H:m")}
            className="px-2 py-1 focus:outline-none bg-slate-200/30"
            readOnly={true}
          />
        </div>
        <InputWithBgm placeLabel={placeLabel} />
        <div className="flex justify-center items-center mb-5">
          <label className="text-lg">{objectLabel} ：</label>
          <input
            type="thing"
            name="thing"
            className="textarea textarea-primary px-2 py-1 "
          ></input>
          {/* {error} */}
        </div>
        <div className="flex justify-center items-center gap-4">
          <InputSubmit />
        </div>
      </form>
    </>
  );
};

export default InputSection;
