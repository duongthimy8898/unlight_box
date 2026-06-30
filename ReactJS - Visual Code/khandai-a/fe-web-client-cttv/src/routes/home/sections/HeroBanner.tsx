import clsx from "clsx";

const HeroBanner = () => {
  return (
    <section className="mt-2">
      {/* <img src="/hero-banner.home.png" alt="" className="aspect-[21/9] lg:aspect-[4/1] w-full object-cover object-fill block bg-white/5 rounded-lg overflow-hidden" /> */}
      <div
        className={clsx(
          "w-full block bg-white/5 rounded-lg object-cover overflow-hidden",
          "bg-cover bg-no-repeat bg-center",
          "aspect-21/9 lg:aspect-4/1 bg-[url('/hero-banner.home.mobile.png')] lg:bg-[url('/hero-banner.home.desktop.png')]",
        )}
      ></div>
    </section>
  );
};

export default HeroBanner;
