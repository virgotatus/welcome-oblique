import { AIResult } from "../api/route"
import { SeatFormat, ticketDateFormat } from "../send-email/dataFormat"

export interface PayloadProps {
  id: number;
  createtime: string;
  place: string;
  username: string;
  oblique: string;
  danwen: string;
  explaination: string;
}

const payloadFront = ({createtime, id, place, username, oblique, danwen}: PayloadProps) => {
  const ticketDate = ticketDateFormat(createtime);
  const ticketSeat = SeatFormat(id, place);
  return (
    {
      "width": 926, "height": 1580, "backgroundColor": "#ffffff",
      "texts": [
          {"text": `${place}`, "x":680, "y": 150, "width": 300, "fontSize": 50, "lineHeight": 50, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `${username}`, "x":130, "y": 340, "width": 200, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `${ticketDate}`, "x": 400, "y":340, "width": 200, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `${ticketSeat}`, "x": 700, "y":340, "width": 200, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `灵感`, "x": 100, "y":500, "width": 540, "fontSize": 24, "lineHeight": 24, "font":"Alibaba-PuHuiTi-Regular", "zIndex": 2},
          {"text": `${oblique}`, "x": 100, "y":530, "width": 540, "fontSize": 32, "lineHeight": 40, "font":"Alibaba-PuHuiTi-Bold", "zIndex": 2},
          {"text": `丹文`, "x": 100, "y":630, "width": 540, "fontSize": 24, "lineHeight": 24, "font":"Alibaba-PuHuiTi-Regular", "zIndex": 2},
          {"text": `${danwen}`,
              "x": 100, "y":660, "width": 620, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Bold", "zIndex": 2}
      ],
      "images": [
          {
              "x": 0,
              "y": 0,
              "width": 926,
              "height": 1580,
              "url": "https://s2.loli.net/2023/12/30/6OBC8jzTwMK1niD.png",
              "zIndex": 1
          }
      ]
      }
  )
}

const payloadBack = ({createtime, id, place, username, oblique, explaination: description}: PayloadProps) => {
  const ticketDate = ticketDateFormat(createtime);
  const ticketSeat = SeatFormat(id, place);
  return (
    {
      "width": 926, "height": 1580, "backgroundColor": "#ffffff",
      "texts": [
          {"text": `${place}`, "x":680, "y": 150, "width": 300, "fontSize": 50, "lineHeight": 50, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `${username}`, "x":130, "y": 340, "width": 200, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `${ticketDate}`, "x": 400, "y":340, "width": 200, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `${ticketSeat}`, "x": 700, "y":340, "width": 200, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `${description}`, "x": 100, "y":500, "width": 540, "fontSize": 28, "lineHeight": 32, "font":"Alibaba-PuHuiTi-Bold", "zIndex": 2},
      ],
      "images": [
          {
              "x": 0,
              "y": 0,
              "width": 926,
              "height": 1580,
              "url": "https://s2.loli.net/2023/12/30/6OBC8jzTwMK1niD.png",
              "zIndex": 1
          }
      ]
      }
  )
}

export {payloadFront, payloadBack}