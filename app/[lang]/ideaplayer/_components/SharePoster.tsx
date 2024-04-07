"use client";
import React, { useState } from "react";
import style from "../ideaplayer.module.css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const SharePoster = ({ label }: { label: string }) => {
  const [isShowed, setIsShowed] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        id="share-picture-button"
        className="btn m-auto mt-4 block "
        onClick={() => setIsShowed(true)}
      >
        {label}
      </Button>
      {/* modal pop */}
      {isShowed && (
        <div
          id="shared-picture-modal"
          className="modal z-50 
          fixed  pt-24 left-0 top-0 w-full h-full overflow-auto
           bg-neutral-900/70"
        >
          {/* close button */}
          <span
            className="
            absolute top-4 right-9 text-neutral-100 font-bold text-4xl
             hover:text-neutral-500 hover:cursor-pointer
             focus:text-neutral-500 focus:cursor-pointer
            "
            id="share-close"
            onClick={() => setIsShowed(false)}
          >
            &times;
          </span>
          <Image
            fill
            alt="poster"
            src="https://s11.ax1x.com/2024/02/20/pFYORld.png"
            className={style.modalContent}
            id="shared-picture"
          />
        </div>
      )}
    </>
  );
};

export default SharePoster;
