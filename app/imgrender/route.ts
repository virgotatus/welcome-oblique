import { NextRequest, NextResponse } from "next/server";
import payload from "./payload";

export async function GET() {
  const response = await fetch("https://api.imgrender.cn/open/v1/pics", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "X-API-Key": process.env['IMG_GEN_API']!,
    },
    body: JSON.stringify(payload("Magnify the most difficult details", `夜晚饥肠久久鸣
    卡路里镇，猛虎行
    细节放大，难题现
    找到食物，胃满情`)),
  })
  const result = await response.json();
  console.log(result);
  return NextResponse.json({ status: 200 });
}