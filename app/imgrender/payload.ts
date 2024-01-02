import { AIResult } from "../api/route"
const payload = (result:AIResult) => {
  return (
    {
      "width": 926, "height": 1580, "backgroundColor": "#ffffff",
      "texts": [
          {"text": "猛虎镇", "x":680, "y": 150, "width": 300, "fontSize": 50, "lineHeight": 50, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": "测试elon", "x":130, "y": 340, "width": 200, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": "2023年12月31日 12:21", "x": 400, "y":340, "width": 200, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": "STG 001", "x": 700, "y":340, "width": 200, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium", "zIndex": 2},
          {"text": `灵感: ${oblique}`, "x": 100, "y":500, "width": 540, "fontSize": 32, "lineHeight": 40, "font":"Alibaba-PuHuiTi-Regular", "zIndex": 2},
          {"text": `丹文\n${description}`,
              "x": 100, "y":630, "width": 600, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Regular", "zIndex": 2}
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

export default payload