import {payloadBack, payloadFront, PayloadProps} from "./payload";
export type { PayloadProps };
import imgrender from "@/lib/imgRender/client";

export async function fetchTickets(aires: PayloadProps) {
  const front = payloadFront(aires);
  const {url: front_url,  img64:front_img64} = await imgrender(front);
  if (!aires.oneside) {
    const back = payloadBack(aires);
    const {url: back_url,  img64:back_img64} = await imgrender(back);
    return {front_img64: front_img64, back_img64: back_img64};
  }
  return {front_img64: front_img64, back_img64: ""};
}
