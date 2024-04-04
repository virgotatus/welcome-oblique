"use client";
import React from "react";
import moment from "moment";
import { ideaSubmit } from "@/actions/ideaplayer";
import { useFormStatus } from "react-dom";

const InputSection = () => {
  const { pending } = useFormStatus();
  const ideaSubmitWith = ideaSubmit.bind(null);

  return (
    <>
      <form action={ideaSubmitWith}>
        <div className="flex justify-center items-center mb-5">
          <label>时间 &nbsp;(Time)：</label>
          <input
            type="gtime"
            name="gtime"
            value={moment().format("Y/M/D H:m")}
            className="px-2 py-1 focus:outline-none bg-slate-200/30"
            readOnly={true}
          />
        </div>
        <div className="flex justify-center items-center mb-5 ">
          <label>场景(Venue)：</label>
          <input
            type="city"
            name="city"
            className="textarea textarea-primary px-2 py-1 "
          ></input>
          {/* {error} */}
        </div>
        <div className="flex justify-center items-center mb-5">
          <label>东西(Object)：</label>
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
            className="inline-block text-lg text-white bg-black hover:border-rose-800 hover:border-4 transition duration-1000 
          m-2 w-auto px-6 py-3"
            id="ask-button"
            disabled={pending}
          >
            生成 (generate)
          </button>
        </div>
      </form>
    </>
  );
};

export default InputSection;
