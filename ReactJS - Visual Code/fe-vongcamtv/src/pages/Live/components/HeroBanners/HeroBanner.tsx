const HeroBanner = ({ src, href }: { src: string; href: string }) => {
  return (
    <a className="w-full aspect-[1330/130]" href={href} target="_blank">
      <img className="w-full h-full" src={src} alt="" />
    </a>
  );
};

export default HeroBanner;
