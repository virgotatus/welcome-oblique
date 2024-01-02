import {payloadBack, payloadFront, PayloadProps} from "./payload";
import axios from 'axios';
import fs from 'fs';

export async function fetchImage(url: string, filename: string) {
  const response = await axios.get(url, { responseType: 'arraybuffer'});

  fs.writeFile(filename, response.data, (err) => {
    if (err) throw err;
    console.log('Image downloaded successfully!');
  });

  return response.data.toString('base64');
}

async function imgrender(data: any, filename: string) {
  const response = await fetch("https://api.imgrender.cn/open/v1/pics", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "X-API-Key": process.env['IMG_GEN_API']!,
    },
    body: JSON.stringify(data),
    // cache: "no-cache",
  })
  const result = await response.json();
  if (result.code == 0 ) {
    const img64 = await fetchImage(result.data.url, filename);
    return {url: result.data.url, filename: filename, img64: img64};
  } else {
    console.error(result);
    return {url: "", filename: filename, img64: ""};
  }
}

export async function fetchTickets(aires: PayloadProps, filefront:string, fileback:string) {
  const front = payloadFront(aires);
  const back = payloadBack(aires);
  const {url: front_url, filename:front_filename, img64:front_img64} = await imgrender(front, filefront);
  const {url: back_url, filename:back_filename, img64:back_img64} = await imgrender(back, fileback);
  return {front_img64: front_img64, back_img64: back_img64};
}
