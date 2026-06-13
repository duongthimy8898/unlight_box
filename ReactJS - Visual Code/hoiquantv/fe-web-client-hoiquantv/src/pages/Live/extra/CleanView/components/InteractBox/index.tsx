import clsx from "clsx";
import { useState } from "react";
import { LuChartBar, LuMessagesSquare, LuTrendingUpDown } from "react-icons/lu";
// import { useAuth } from "../../../../hooks/useAuth";
// import useAuthModal from "../../../../hooks/useAuthModal";

const InteractBox = ({ chatChannelKeyId }: { chatChannelKeyId: string | null | undefined }) => {
  // const { isAuthenticated } = useAuth();
  // const { openAuthModal } = useAuthModal();
  console.log(chatChannelKeyId);
  const chatChannelId = chatChannelKeyId ? chatChannelKeyId.split("-")[0] : undefined;
  const chatChannelKey = chatChannelKeyId ? chatChannelKeyId.split("-")[1] : undefined;
  const [activeTab, setActiveTab] = useState("tab1");
  const [chatMode, setChatMode] = useState("global");
  return (
    <div className={clsx("bg-black w-full flex flex-col overflow-hidden h-full")}>
      <div className="flex py-1 lt:py-3 px-3 justify-start bg-[linear-gradient(180deg,_#282a2c_0.08%,_#282a2c_10.42%,_#1e2021_40.82%)] gap-2">
        {[
          { id: "tab1", icon: <LuMessagesSquare size={20} />, label: "Chat" },
          { id: "tab2", icon: <LuChartBar size={20} />, label: "Thông số" },
          { id: "tab3", icon: <LuTrendingUpDown size={20} />, label: "Tóm tắt" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-1.5 rounded-full text-xs font-medium border flex items-center justify-center transition-all duration-200 gap-1
              ${
                activeTab === tab.id
                  ? "bg-[linear-gradient(125deg,_#2563eb,_#1e3a8a_27.66%,_#0a1a3f_68.97%)] text-[#4ca6ff] px-4 border-[#4ca6ff]"
                  : "bg-transparent text-[#9c9c9c] border-transparent px-0 hover:text-[#4ca6ff]"
              }
            `}
          >
            <i>{tab.icon}</i>
            <span
              className={clsx("block transition-all duration-200 whitespace-nowrap w-fit overflow-hidden", activeTab !== tab.id ? "max-w-0" : "max-w-[200px]")}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className={clsx("bg-black flex-1 h-full flex-shrink-0")}>
        {activeTab === "tab1" && (
          <div className={clsx("w-full h-full flex flex-col")}>
            <div className="flex-1 flex flex-col">
              <div className="flex">
                <button
                  onClick={() => setChatMode("global")}
                  className={clsx(
                    "flex-1 py-1.5 px-3 text-xs lt:text-sm font-semibold border-b-2",
                    chatMode === "global" ? "border-blue-500 text-blue-500" : "border-blue-500/50"
                  )}
                >
                  Chung
                </button>
                <button
                  onClick={() => setChatMode("local")}
                  className={clsx(
                    "flex-1 py-1.5 px-3 text-xs lt:text-sm font-semibold border-b-2",
                    chatMode === "local" ? "border-blue-500 text-blue-500" : "border-blue-500/50"
                  )}
                >
                  Trận
                </button>
              </div>

              <div className="w-full flex-1" style={{ display: chatMode === "global" ? "block" : "none" }}>
                <iframe width="100%" height="100%" src="https://www5.cbox.ws/box/?boxid=957822&boxtag=bST1X5"></iframe>
              </div>
              <div className="w-full flex-1" style={{ display: chatMode === "local" && chatChannelId && chatChannelKey ? "block" : "none" }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www5.cbox.ws/box/?boxid=957822&boxtag=bST1X5&tid=${chatChannelId}&tkey=${chatChannelKey}`}
                ></iframe>
              </div>

              {/* {!isAuthenticated && (
                <div className="absolute bottom-0 left-0 z-50 w-full h-[128px] bg-gradient-to-t from-[#000000_75%] to-black/0 flex justify-center items-center">
                  <button
                    onClick={() => openAuthModal()}
                    className="px-4 py-2 rounded-full bg-blue-500 text-xs font-semibold text-white border border-white shadow"
                  >
                    Đăng nhập để Chat
                  </button>
                </div>
              )} */}
            </div>
          </div>
        )}
        {activeTab === "tab2" && (
          <div className="w-full h-full">
            <span className="w-full block text-center text-xs py-4">Đang phát triển...</span>
          </div>
        )}
        {activeTab === "tab3" && (
          <div className="w-full h-full">
            <span className="w-full block text-center text-xs py-4">Đang phát triển...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractBox;
