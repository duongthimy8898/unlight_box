import { Link, redirect } from "@tanstack/react-router";
import type { PrioritizedCommentator } from "../../shared/types/Fixture";
import watchRoute from "../../app/routes/watch.route";
import { Maximize, Minimize } from "lucide-react";
import Player from "./Player";
import { useContext } from "react";
import { ViewContext } from "./MainBox";

const PlayerBox = ({ broadcast }: { broadcast: PrioritizedCommentator }) => {
  const { kenh } = watchRoute.useSearch();
  const channel = broadcast.commentator.streams.find((s) => s.id === kenh);
  const ctx = useContext(ViewContext);
  if (!channel || !ctx) throw redirect({ to: "/trang-chu" });
  const { viewMode, setViewMode } = ctx;

  const gradId = `bfix-grad-${broadcast.commentator.id}`;
  const clipId = `bfix-clip-${broadcast.commentator.id}`;
  return (
    <div className="flex flex-col h-full bg-[#383838]">
      <div className="flex flex-row justify-start items-center gap-2 py-2 px-2">
        {broadcast.commentator.streams.map((s, idx) => (
          <Link
            key={idx}
            to="/truc-tiep/$fixtureSlug"
            search={{
              blv: broadcast.commentator.id,
              kenh: s.id,
            }}
            resetScroll={false}
            activeOptions={{
              exact: true,
              includeSearch: true,
            }}
            activeProps={{
              className: "bg-[#ffd000]! text-black!",
            }}
            className="py-1 px-3 rounded text-xs text-white bg-[#6b7280]"
          >
            {s.name}
          </Link>
        ))}
      </div>
      <div className="aspect-video">
        <Player src={channel!.sourceUrl!} poster="/logo-x.png" />
      </div>
      <div className="flex flex-row justify-start items-center gap-2 py-2 px-2">
        <div className="flex flex-row items-center gap-1">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" className="shrink-0">
            <g clipPath={`url(#${clipId})`}>
              <path
                d="M3.5 9H5.75C6.14782 9 6.52936 9.15804 6.81066 9.43934C7.09196 9.72064 7.25 10.1022 7.25 10.5V14.25C7.25 14.6478 7.09196 15.0294 6.81066 15.3107C6.52936 15.592 6.14782 15.75 5.75 15.75H3.5C3.10218 15.75 2.72064 15.592 2.43934 15.3107C2.15804 15.0294 2 14.6478 2 14.25V9C2 4.85775 5.35775 1.5 9.5 1.5C13.6423 1.5 17 4.85775 17 9V14.25C17 14.6478 16.842 15.0294 16.5607 15.3107C16.2794 15.592 15.8978 15.75 15.5 15.75H13.25C12.8522 15.75 12.4706 15.592 12.1893 15.3107C11.908 15.0294 11.75 14.6478 11.75 14.25V10.5C11.75 10.1022 11.908 9.72064 12.1893 9.43934C12.4706 9.15804 12.8522 9 13.25 9H15.5C15.5 7.4087 14.8679 5.88258 13.7426 4.75736C12.6174 3.63214 11.0913 3 9.5 3C7.9087 3 6.38258 3.63214 5.25736 4.75736C4.13214 5.88258 3.5 7.4087 3.5 9Z"
                fill={`url(#${gradId})`}
              />
            </g>
            <defs>
              <radialGradient
                id={gradId}
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(20.951 21.5391) rotate(-172.469) scale(18.6862 24.4664)"
              >
                <stop offset="0.496798" stopColor="#FFC400" />
                <stop offset="0.530846" stopColor="#FFD500" />
                <stop offset="0.794704" stopColor="#FFC400" />
                <stop offset="0.881389" stopColor="#FFD000" />
                <stop offset="1" stopColor="#FFBB00" />
              </radialGradient>
              <clipPath id={clipId}>
                <rect width="18" height="18" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
          <span className="text-xs text-white">{broadcast.commentator.nickname}</span>
        </div>
        <a
          href="#!"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto leading-none flex gap-1 items-center py-1 px-3 font-medium rounded text-black outline-transparent transition"
          style={{
            color: "white",
            textDecoration: "none",
            background: "rgb(0, 121, 250)",
          }}
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase whitespace-nowrap">CƯỢC UY TÍN 8XBET</span>
        </a>
        <button
          onClick={() => setViewMode(viewMode === "normal" ? "fullscreen" : "normal")}
          className="py-2 px-2 rounded border border-[#64748b] flex flex-row items-center gap-1 text-white"
        >
          {viewMode === "normal" ? <Maximize size={16} /> : <Minimize size={16} />}
          <span className="text-[10px] uppercase">{viewMode === "normal" ? "Mở rộng" : "Thu nhỏ"}</span>
        </button>
      </div>
    </div>
  );
};

export default PlayerBox;
