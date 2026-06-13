import clsx from "clsx";
import { useState } from "react";
import adBanners from "../../../../data/adBanners";
// import { LuSend } from "react-icons/lu";

const InteractBox = ({ matchId }: { matchId: number | undefined }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div className={clsx("bg-black w-full flex flex-col overflow-hidden h-full")}>
      <div className="w-full flex flex-col">
        {adBanners.BOXCHAT.map((banner, idx) => (
          <a key={idx} className="block w-full aspect-[480/45]" href={banner.href} target="_blank">
            <img loading="lazy" className="w-full h-full" src={banner.src} alt="" />
          </a>
        ))}
      </div>
      <div className="flex space-x-2 py-2 px-2 justify-start bg-black">
        {[
          { id: "tab1", label: "Chung" },
          { id: "tab2", label: "Tóm tắt" },
          { id: "tab3", label: "Thông số" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-md text-xs font-medium border
              ${activeTab === tab.id ? "bg-blue-500 text-white" : "bg-white text-gray-800 border-gray-300"}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Content */}
      <div className={clsx("bg-black h-full")}>
        {activeTab === "tab1" && (
          <div className={clsx("w-full h-full flex flex-col")}>
            <div className="flex-1">
              <iframe width="100%" height="100%" src="https://www5.cbox.ws/box/?boxid=957822&boxtag=bST1X5"></iframe>
            </div>
          </div>
        )}
        {activeTab === "tab2" && (
          <div className="w-full h-full">
            <iframe src={`https://widget-events.livestats.online/?fixtureId=${matchId}`} frameBorder={0} width="100%" height="100%"></iframe>
          </div>
        )}
        {activeTab === "tab3" && (
          <div className="w-full h-full">
            <iframe
              src={`https://widget-statistics.livestats.online/?fixtureId=${matchId}&homeColor=%235EA522&awayColor=%23F8C32F`}
              // frameBorder={0}
              width="100%"
              height="100%"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractBox;
