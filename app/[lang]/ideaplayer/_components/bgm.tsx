"use client";
import React from "react";
import { useRef, useState } from "react";

const Bgm = () => {
  const [bgmState, setBgmOn] = useState(false);
  const audioElement = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined"
      ? new Audio("/audio/Brian-Eno-1-1-zip.mp3")
      : undefined
  );
  const volumeTrigger = useRef<HTMLInputElement>(null);

  const handleVolumeChange = () => {
    const isChecked = volumeTrigger.current?.checked as boolean;
    setBgmOn(isChecked); // 更新状态
    isChecked ? audioElement.current?.play() : audioElement.current?.pause();
  };

  return (
    <div className="">
      {/* <audio id="bgm" controls loop autoPlay className=" w-full">
        <source src="/ideaplayer/Brian-Eno-1-1-zip.mp3" type="audio/mpeg" />
      </audio> */}
      <label className="swap">
        {/* this hidden checkbox controls the state */}
        <input
          type="checkbox"
          ref={volumeTrigger}
          onClick={handleVolumeChange}
          className="hidden"
        />
        {/* volume icon */}
        {bgmState ? (
          <svg
            className=" fill-current hover:cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
          </svg>
        ) : (
          <svg
            className=" fill-current hover:cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" />
          </svg>
        )}
      </label>
    </div>
  );
};

export default Bgm;
