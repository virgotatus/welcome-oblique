import {payloadBack, payloadFront, PayloadProps} from "./payload";
export type {PayloadProps};

async function fetchImage(url: string) {
  try {
    const response = await fetch(url, {cache: "no-cache"});
    const arrayBuffer = await response.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');
    return base64String;
  } catch (error) {
    console.error(error);
    return "";
  }
}

async function imgrender(data: any) {
  const response = await fetch("https://api.imgrender.net/open/v1/pics", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
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
  const {url: front_url,  img64:front_img64} = await imgrender(front);
  if (!aires.oneside) {
    const back = payloadBack(aires);
    const {url: back_url,  img64:back_img64} = await imgrender(back);
    return {front_img64: front_img64, back_img64: back_img64};
  }
  return {front_img64: front_img64, back_img64: ""};
}
