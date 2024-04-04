"use client";
import { Button } from "@/components/ui/button";
import style from "../ideaplayer.module.css";
import Image from "next/image";
import MoneyImage from "@/public/ideaplayer/money.jpg";

const PayModal = () => {
  return (
    <>
      <Button
        variant="outline"
        type="button"
        id="money-button"
        className=" box-border m-auto mt-4 block px-6"
        onClick={() => {
          console.log("Buy me a Coffee!");
          const modal = document.getElementById(
            "money-modal"
          ) as HTMLDialogElement;
          modal?.showModal();
        }}
      >
        投币！(Buy me a Coffee!)
      </Button>

      <dialog
        className=" modal z-50 fixed 
             pt-24 left-0 top-0 w-full h-full overflow-auto
             bg-neutral-900/70"
        id="money-modal"
      >
        <div className="modal-box">
          <form method="dialog">
            <button
              className="
            absolute top-4 right-9 text-neutral-700 font-bold text-4xl
             hover:text-neutral-500 hover:cursor-pointer
             focus:text-neutral-500 focus:cursor-pointer
            "
              id="money-close"
            >
              &times;
            </button>
          </form>
          <Image
            alt="money"
            src={MoneyImage}
            className={style.modalContent + " w-96"}
          />
          <div
            className={
              style.Modalcontent +
              "w-32 text-center text-yellow-600 text-lg font-semibold "
            }
          >
            <p> OR </p>
            <a
              href="https://paypal.me/elongong?country.x=C2&locale.x=zh_XC"
              target="_blank"
              rel="noopener noreferrer"
            >
              Paypal
            </a>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default PayModal;
