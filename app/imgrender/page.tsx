import { PayloadProps } from "./payload";
import { fetchTickets } from "./fetchTickets";
import Image from "next/image";

const Page = async () => {
  const aires: PayloadProps = {
    id: 0,
    createtime: "2024年1月2日 15:47",
    place: "猛虎镇",
    username: "易经",
    danwen: `夜晚饥肠久久鸣
卡路里镇，猛虎行
细节放大，难题现
找到食物，胃满情`,
    oblique: "Magnify the most difficult details",
    explaination: `解释:
在这个问题中，我们谈论到边界感和真实之间的关系。"一见如故的灵魂朋友"象征着那些我们在赛鸽镇 (一个虚构的地方) 遇到的人，他们与我们有着深刻的共鸣和连接。这种连接使得边界感和真实之间的分隔变得模糊。因此通过将完美的事物变得更加人性化，我们可以建立起与真实世界的更紧密联系，打破边界感的束缚。这种连接的存在使我们能够更深入地感知和理解真实的本质。`,
  };
  const { front_img64, back_img64 } = await fetchTickets(aires);
  return (
    <>
      <Image
        src={`data:image/jpg;base64,${front_img64}`}
        alt="sad"
        width={500}
        height={500}
      />
      <Image
        src={`data:image/jpg;base64,${back_img64}`}
        alt="sad"
        width={500}
        height={500}
      />
    </>
  );
};

export default Page;
