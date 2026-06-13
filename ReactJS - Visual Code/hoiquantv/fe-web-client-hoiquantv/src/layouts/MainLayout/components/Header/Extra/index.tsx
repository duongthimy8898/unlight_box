import clsx from "clsx";
import { forwardRef } from "react";
import adBanners from "../../../../../data/adBanners";

const Extra = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => {
  return (
    <div ref={ref} {...props} className="w-full flex flex-col items-center justify-center">
      {/* <a
        href="mailto:ads.hoiquantv@hotmail.com"
        className={clsx("w-full py-1 px-4 text-sm text-white text-center bg-gradient-to-r from-blue-950 to-blue-500 truncate", "lt:hidden")}
      >
        <span>LHQC: </span>
        <span className="font-semibold">ads.hoiquantv@hotmail.com</span>
      </a> */}
      <div className={clsx("w-full flex justify-center items-center")}>
        <a className={clsx("block w-full lt:max-w-[50%] aspect-[1152/100] h-auto")} href={adBanners.HEADER.href} target="blank">
          <img src={adBanners.HEADER.src} alt="" />
        </a>
      </div>
    </div>
  );
});

export default Extra;
