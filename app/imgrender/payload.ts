import { SeatFormat, ticketDateFormat } from "../send-email/dataFormat"

export interface PayloadProps {
  id: number;
  createtime: string;
  place: string;
  username: string;
  oblique: string;
  danwen: string;
  explaination: string;
  oneside?: boolean;
}

const BG_URL = "https://q24.io/wp-content/uploads/2024/01/ticket-ling-school0103.png";
const PAD = 30;

const payloadFront = ({createtime, id, place, username, oblique, danwen, oneside}: PayloadProps) => {
  const ticketDate = ticketDateFormat(createtime);
  const ticketSeat = SeatFormat(id, place);
  return (
    {
      "width": 926, "height": 1580, "backgroundColor": "#ffffff",
      "texts": [
          {"text": `${place}`, "x": PAD+650, "y": PAD+170, "width": 300, "fontSize": 50, "lineHeight": 50, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `${username}`, "x": PAD+150, "y": PAD+340, "width": 200, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `${ticketDate}`, "x": PAD+400, "y": PAD+340, "width": 200, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `${ticketSeat}`, "x": PAD+670, "y": PAD+340, "width": 200, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `灵感`, "x": PAD+100, "y": PAD+500, "width": 540, "fontSize": 24, "lineHeight": 24, "font":"Alibaba-PuHuiTi-Regular", "zIndex": 2},
          {"text": `${oblique}`, "x": PAD+100, "y": PAD+530, "width": 530, "fontSize": (oneside? 24:32), "lineHeight": (oneside? 28:40), "font":"Alibaba-PuHuiTi-Bold", "zIndex": 2},
          {"text": `丹文`, "x": PAD+100, "y": PAD+(oneside? 565:630), "width": 540, "fontSize": 24, "lineHeight": 24, "font":"Alibaba-PuHuiTi-Regular", "zIndex": 2},
          {"text": `${danwen}`,
              "x": PAD+100, "y": PAD+(oneside? 595:660), "width": 530, "fontSize": (oneside? 24:32), "lineHeight": (oneside? 28:40), "font": "Alibaba-PuHuiTi-Bold", "zIndex": 2}
      ],
      "images": [
          {
              "x": 0,
              "y": 0,
              "width": 926,
              "height": 1580,
              "url": BG_URL,
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
          {"text": `${place}`, "x": PAD+650, "y": PAD+170, "width": 300, "fontSize": 50, "lineHeight": 50, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `${username}`, "x": PAD+150, "y": PAD+340, "width": 200, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `${ticketDate}`, "x": PAD+400, "y": PAD+340, "width": 200, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `${ticketSeat}`, "x": PAD+670, "y": PAD+340, "width": 200, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `${description}`, "x": PAD+100, "y": PAD+500, "width": 530, "fontSize": 28, "lineHeight": 32, "font":"Alibaba-PuHuiTi-Bold", "zIndex": 2},
      ],
      "images": [
          {
              "x": 0,
              "y": 0,
              "width": 926,
              "height": 1580,
              "url": BG_URL,
              "zIndex": 1
          }
      ]
      }
  )
}

export {payloadFront, payloadBack}