import Main from "./Main";
import Extra from "./Extra";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  const extraRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const extraHeight = extraRef.current?.getBoundingClientRect().height || 0;
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop >= extraHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={clsx("w-full bg-inherit")}>
      <Extra ref={extraRef} />
      {isSticky && <div style={{ height: mainRef.current?.getBoundingClientRect().height }}></div>}
      <Main ref={mainRef} additionalClassName={isSticky ? "fixed top-0 left-0 z-30" : undefined} />
    </section>
  );
};

export default Header;
