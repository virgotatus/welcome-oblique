import {payloadBack, payloadFront, PayloadProps} from "./payload";
import axios from 'axios';

export async function fetchImage(url: string) {
  const response = await axios.get(url, { responseType: 'arraybuffer'});

  return response.data.toString('base64');
}

async function imgrender(data: any) {
  const response = await fetch("https://api.imgrender.cn/open/v1/pics", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "X-API-Key": process.env['IMG_GEN_API']!,
    },
    body: JSON.stringify(data),
    cache: "no-cache", // no cache when dev
  })
  const result = await response.json();
  if (result.code == 0 ) {
    const img64 = await fetchImage(result.data.url);
    return {url: result.data.url, img64: img64};
  } else {
    console.error(result);
    return {url: "", img64: ""};
  }
}

export async function fetchTickets(aires: PayloadProps) {
  const front = payloadFront(aires);
  const back = payloadBack(aires);
  const {url: front_url,  img64:front_img64} = await imgrender(front);
  const {url: back_url,  img64:back_img64} = await imgrender(back);
  return {front_img64: front_img64, back_img64: back_img64};
}
