interface PayloadProps {
  createtime: string;
  place: string;
  object: string
  oblique: string;
  answer: string;
}

export function Payload({createtime, place, object, oblique, answer }: PayloadProps) {
  return (
    {
      "width": 600, "height": 966, "backgroundColor": "#ffa500",
      "texts": [
          {"text": "灵感炼丹炉", "x": 225, "y":320, "width": 300, "fontSize": 34, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium"},
          {"text": "Stochastic Idea Player", "x": 145, "y":370, "width": 400, "fontSize": 32, "lineHeight": 40, "font": "Alibaba-PuHuiTi-Medium"},
          {"text": `${createtime}`, "x": 30, "y":430, "width": 200, "fontSize": 20, "lineHeight": 30, "font": "SourceHanSansSC-Light"},
          {"text": `场(Venue):${place}`, "x": 220, "y":430, "width": 200, "fontSize": 20, "lineHeight": 30, "font": "SourceHanSansSC-Light"},
          {"text": `物(Object):${object}`, "x": 400, "y":430, "width": 200, "fontSize": 20, "lineHeight": 30, "font": "SourceHanSansSC-Light"},
          {"text": `灵感(Oblique Strategies): ${oblique.replaceAll("\\n", '\n')}`, "x": 30, "y":470, "width": 540, "fontSize": 20, "lineHeight": 30, "font":"SourceHanSansSC-Light"},
          {"text": `丹文(Description): ${answer.replaceAll("\\n", '\n') }`,
              "x": 30, "y":530, "width": 540, "fontSize": 20, "lineHeight": 30, "font": "SourceHanSansSC-Light"}
      ],
      "images": [
          {
              "x": 30,
              "y": 25,
              "width": 540,
              "height": 270,
              "url": "https://dq51jve9h21d4.cloudfront.net/sites/default/files/styles/banner_image/public/articles/264/x5a268552-6c2f-4d4d-9a63-49bd980a02de.jpeg.pagespeed.ic.MIJkwlXjzS.webp",
              "zIndex": 1
          }
      ],
      "qrcodes": [
          {
              "x": 520,
              "y": 880,
              "size": 70,
              "content": "http://asky.ideaplayer.shop",
              "foregroundColor": "#000",
              "backgroundColor": "#ffa500",
              "zIndex": 1
          }
      ]
      }
  )
}