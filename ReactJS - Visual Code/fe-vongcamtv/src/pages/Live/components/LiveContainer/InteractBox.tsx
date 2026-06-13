import clsx from "clsx";
import { Send } from "lucide-react";
import { useState } from "react";

const InteractBox = ({ matchId }: { matchId: number }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div className={clsx("bg-black w-full flex flex-col overflow-hidden h-full")}>
      {/* <div className="w-full">
        <a
          className="block w-full h-[25px]"
          href="https://net88.tv/?a=b0a42f6b5cea024afdab8840d6058c1a&utm_campaign=cpd&utm_source=live_bugiotv&utm_medium=banner_livechat_320x64"
          target="_blank"
        >
          <img loading="lazy" className="w-full h-full" src="https://sv-bugio.xyz/uploads/resources/images/4602b1d97761d253bed2fb6877b47dcf.gif" alt="" />
        </a>
      </div> */}
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
            <a
              href="https://t.me/anhemvongcam"
              target="_blank"
              className="bg-cyan-500 text-white px-3 py-1.5 flex justify-center items-center gap-1 w-full rounded mx-auto"
            >
              <Send size={18} />
              <span className="text-sm font-semibold">Tham Gia Nhóm Telegram</span>
            </a>
            <div className="flex-1">
              <iframe width="100%" height="100%" src="https://www5.cbox.ws/box/?boxid=949782&boxtag=xfwsb0"></iframe>
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
              frameBorder={0}
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
