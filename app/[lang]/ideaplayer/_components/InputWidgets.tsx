"use client";
import { useFormStatus } from "react-dom";

export const InputWithBgm = ({ placeLabel }: { placeLabel: string }) => {
  return (
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
  );
};

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
