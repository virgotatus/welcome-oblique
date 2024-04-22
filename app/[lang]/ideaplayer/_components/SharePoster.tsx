"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import style from "../ideaplayer.module.css";
import { fetchPoster } from "@/actions/ideaplayer";
import { useParams } from "next/navigation";

interface Props {
  label: string;
}

const SharePoster = ({ label }: Props) => {
  const placeholder = "https://via.placeholder.com/600x1000";
  const [isShowed, setIsShowed] = useState(false);
  const [img_url, setImgUrl] = useState(placeholder);
  const params = useParams<{ id: string }>();

  const fetchImg = async () => {
    return await fetchPoster(params.id);
  };

  return (
    <>
      <Button
        type="submit"
        variant="outline"
        id="share-picture-button"
        className="btn m-auto mt-4 block "
        onClick={() => {
          if (img_url === placeholder) {
            fetchImg().then((res) => {
              setImgUrl(res.url);
              console.log("fetch img");
            });
          }
          setIsShowed(true);
        }}
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
            loading="lazy"
            alt="poster"
            src={img_url}
            className={style.modalContent}
            id="shared-picture"
          />
        </div>
      )}
    </>
  );
};

export default SharePoster;
