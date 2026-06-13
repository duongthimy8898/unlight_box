import { useEffect, useRef, useState } from "react";
import Extra from "./components/Extra";
import Main from "./components/Main";
import clsx from "clsx";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  const extraRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const extraHeight = extraRef.current?.getBoundingClientRect().height || 0
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop >= extraHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={clsx("w-full flex flex-col")}>
      <Extra ref={extraRef} />
      {isSticky && <div style={{ height: mainRef.current?.getBoundingClientRect().height }}></div>}
      <Main ref={mainRef} additionalClassName={isSticky ? "fixed top-0 left-0 z-30" : undefined} />
    </header>
  );
};

export default Header;
