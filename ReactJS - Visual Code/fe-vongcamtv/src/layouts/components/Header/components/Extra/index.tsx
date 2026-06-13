// import clsx from "clsx";
import { forwardRef, useState } from "react";

const Extra = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => {
  const [contact] = useState("ads.bugiotv@gmail.com");

  return (
    <div ref={ref} {...props} className="w-full flex flex-col">
      <a className="w-full" href="https://6789x.site/ad9namei200">
        <img className="w-full" src="/banners/vs_1920x60.gif" alt="" />
      </a>
      <a className="w-full" href="https://www.fb88alo.com/?affiliateId=8623">
        <img className="w-full" src="/banners/fb88_1920x60.gif" alt="" />
      </a>
      {/* <div
        className={clsx(
          "w-full py-1 flex items-center justify-center animate-gradient-x bg-[linear-gradient(270deg,_#22c55e,_#16a34a,_#065f46,_#22c55e)] bg-[length:400%_400%]",
          "tb:py-2",
        )}
      >
        <div className="text-white text-sm text-center drop-shadow-lg animate-pulse">
          <span className="inline-block mr-2">Liên hệ quảng cáo</span>
          <b className="inline-block">{contact}</b>
        </div>
      </div> */}
    </div>
  );
});

export default Extra;
