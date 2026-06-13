import { useInView } from "react-intersection-observer";
import type { Match } from "../../../../types/Match.type";
import "./customArtPlayer.css";
import InteractBox from "./InteractBox";
import PlayerBox from "./PlayerBox";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { mapToMatch } from "../../../../utils/MatchUtils";
import dayjs from "dayjs";

const LiveContainer = () => {
  const { ref: sentinelRef, inView } = useInView({ threshold: 0 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isFloating = isMobile && !inView;
  const wrapperPlayerBoxRef = useRef<HTMLDivElement | null>(null);
  const [wrapperPlayerBoxHeight, setWrapperPlayerBoxHeight] = useState(0);

  const { id } = useParams();
  const fetchCurrentMatch = async (): Promise<Match> => {
    const response = await fetch(`https://sv.bugiotv.xyz/internal/api/matches/${id}`);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody?.message || "Không thể tải pinned matches");
    }

    const jsonRes = await response.json();
    const result = jsonRes.data;
    const currentMatchMapped: Match = await mapToMatch(result);
    // console.log(currentMatchMapped)
    return currentMatchMapped;
  };

  const { data: currentMatch } = useQuery<Match>({
    queryKey: ["currentMatch", id],
    queryFn: fetchCurrentMatch,
  });

  useEffect(() => {
    setWrapperPlayerBoxHeight(wrapperPlayerBoxRef.current?.getBoundingClientRect().height || 0);
  }, [isFloating]);
  const date = dayjs(currentMatch?.startTime);
  const onlyTime = date.format("HH:mm");
  const onlyDate = date.format("D/M");
  return (
    <div className="w-full flex flex-col lt:flex-row">
      {isMobile && <div ref={sentinelRef} className="absolute h-0 w-full -mt-px pointer-events-none" />}
      {isFloating && <div style={{ height: wrapperPlayerBoxHeight }} />}
      <div
        ref={wrapperPlayerBoxRef}
        className={clsx("flex-1 bg-black transition-all", isFloating && "fixed top-0 left-0 w-full min-w-full z-100 animate-zoom-in")}
      >
        <PlayerBox
          props={{
            title: `${onlyTime} ${onlyDate} | ${currentMatch?.title}`,
            poster: "/poster.png",
            isLive: currentMatch?.isPlaying ?? false,
            commentator: currentMatch?.commentator,
            startTime: new Date(currentMatch?.startTime || 0)
            // source: null,
          }}
        />
      </div>
      <div className="w-full h-[480px] lt:w-[256px] lt:h-auto dt:w-[320px] dt:h-auto">
        <InteractBox matchId={currentMatch?.referenceId ?? -9999} />
      </div>
    </div>
  );
};

export default LiveContainer;
