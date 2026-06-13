import MarqueeText from "react-marquee-text";

const MarqueeSection = () => {
  return (
    <section className="py-2 px-2 bg-[#171C27]">
      <MarqueeText direction="right" pauseOnHover duration={10} className="font-light">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum aliquid dignissimos, laboriosam deserunt reprehenderit praesentium sed corrupti nihil
        ratione, aspernatur ea et explicabo assumenda illo nostrum fuga. Vero, similique numquam!
      </MarqueeText>
    </section>
  );
};

export default MarqueeSection;
