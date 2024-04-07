"use client";
import React from "react";
import moment from "moment";
import { ideaSubmit } from "@/actions/ideaplayer";
import { useFormStatus } from "react-dom";

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
  const { pending } = useFormStatus();
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
        <div className="flex justify-center items-center mb-5 ">
          <label className="text-lg">{placeLabel} ：</label>
          <input
            type="city"
            name="city"
            className="textarea textarea-primary px-2 py-1 "
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
          <button
            type="submit"
            className="inline-block text-2xl text-white bg-black hover:border-rose-800 hover:border-4 transition duration-1000 
          m-2 w-auto px-12 py-5"
            id="ask-button"
            disabled={pending}
          >
            生成 (Generate)
          </button>
        </div>
      </form>
    </>
  );
};

export default InputSection;
