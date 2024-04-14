import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Receiver } from "@/actions/mail-fellow"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseReceivers(receivers: string) {
  let res: Receiver[] = [];
  receivers.split("\n").map((line) => {
    const [name, address] = line.split(" ");
    res.push({ name: name, address: address });
  });
  return res;
}