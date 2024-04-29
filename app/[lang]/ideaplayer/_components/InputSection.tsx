"use client";
import { ideaSubmit } from "@/actions/ideaplayer";
import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";

interface LabelProps {
  timeLabel: string;
  placeLabel: string;
  objectLabel: string;
  locale: string;
}

export const InputSubmit = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="inline-block text-2xl text-white bg-black hover:border-rose-800 hover:border-4 transition duration-1000 
          m-2 w-auto px-12 py-5 disabled:bg-slate-400"
      id="ask-button"
      disabled={pending}
    >
      {pending ? "炼丹中……" : "生成 (Generate)"}
    </button>
  );
};

const DateTime = ({ locale }: { locale: string }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 5000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, [date]);

  return (
    <input
      type="gtime"
      name="gtime"
      value={date.toLocaleString(locale, { hour12: false })}
      className="px-2 py-1 focus:outline-none bg-slate-200/30"
      readOnly={true}
    />
  );
};

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
        </div>
        <div className="flex justify-center items-center mb-5 ">
          <label className="text-lg">{timeLabel} ：</label>
          <DateTime locale={locale} />
        </div>
        <div className="flex justify-center items-center mb-5 ">
          <label className="text-lg">{placeLabel} ：</label>
          <input
            type="city"
            name="city"
            className="textarea textarea-primary px-2 py-1 "
            onFocus={() => {
              const volume_trigger = document.getElementById(
                "volumeTrigger"
              ) as HTMLInputElement;
              if (!volume_trigger?.checked) {
                volume_trigger.click();
              }
            }}
          ></input>
          {/* {error} */}
        </div>
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
