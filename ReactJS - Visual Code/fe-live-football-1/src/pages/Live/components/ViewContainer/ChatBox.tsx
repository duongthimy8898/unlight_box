import clsx from "clsx";
import { useState } from "react";

const ChatBox = ({ matchId }: { matchId: number }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div className={clsx("bg-black w-full flex flex-col overflow-hidden h-full")}>
      <div className="w-full">
        <a
          className="block w-full h-[25px]"
          href="https://net88.fund/?a=b0a42f6b5cea024afdab8840d6058c1a&utm_campaign=cpd&utm_source=live_bugiotv&utm_medium=banner_livechat_320x64&referrer_domain=sv1.bugio10.live"
          target="_blank"
        >
          <img loading="lazy" className="w-full h-full" src="/banners/net88_1152x100.gif" alt="" />
        </a>
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
            className={`px-4 py-1.5 rounded-md text-xs font-semibold border
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
          <div className={clsx("w-full h-full")}>
            <iframe width="100%" height="100%" src="https://www5.cbox.ws/box/?boxid=949782&boxtag=xfwsb0" frameBorder="0"></iframe>
          </div>
        )}
        {activeTab === "tab2" && (
          <div className="w-full h-[320px] lg:h-full">
            <iframe src={`https://widget-events.livestats.online/?fixtureId=${matchId}`} frameBorder={0} width="100%" height="100%"></iframe>
          </div>
        )}
        {activeTab === "tab3" && (
          <div className="w-full h-[320px] lg:h-full">
            <iframe src={`https://widget-statistics.livestats.online/?fixtureId=${matchId}&homeColor=%232A4AE1&awayColor=%23F8C32F`} frameBorder={0} width="100%" height="100%"></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
