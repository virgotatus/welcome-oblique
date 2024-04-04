export default function Home() {
  const content =
    "马桶兔子洞\n生活好不好\n全在于便\n\n哟，这位朋友，你问的可真是个大问题啊！何为良好生活？这可不是一两句话能概括的。不过，我有一首俳句，或许可以给你一点启示。\n\n马桶兔子洞，这是一个有趣的比喻。马桶代表着我们每天必须面对的琐事和困难，就像上厕所一样，无论你高兴不高兴，都是必须面对的。而兔子洞则象征着我们心中的梦想和渴望，那个美好的理想世界。俳句的意思是，良好生活其实全在于便，也就是说，如何处理好琐事和困难，是我们能否达到理想生活的关键。\n\n如果我们只关注兔子洞，追逐着梦想，却忽略了面对琐事和困难，那么我们的生活就会变得不堪忍受。相反，如果我们能够勇敢地面对琐事和困难，解决它们，那么我们才能逐渐接近那个理想的兔子洞。\n\n所以，朋友啊，良好生活的关键在于我们如何处理琐事和困难。不要害怕马桶，也不要忽略兔子洞。保持平衡，勇往直前，相信你终将找到自己的良好生活！祝你好运！";
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p
          dangerouslySetInnerHTML={{
            __html: content.replaceAll("\n", "<br/>"),
          }}
        ></p>
      </div>
    </main>
  );
}
