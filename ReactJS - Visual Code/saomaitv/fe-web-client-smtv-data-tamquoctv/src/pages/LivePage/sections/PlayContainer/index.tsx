import { useMemo, useState } from "react";
import type { Fixture } from "../../../../shared/types/Fixture";
import type { Commentator } from "../../../../shared/types/Commentator";
import type { StreamSource } from "../../../../shared/types/StreamSource";
import InteractBox from "./InteractBox";
import PlayerBox from "./PlayerBox";
import clsx from "clsx";

const PlayContainer = ({ fixture }: { fixture: Fixture }) => {
  const [cleanMode, setCleanMode] = useState<boolean>(false);
  const handleToggle = () => setCleanMode((prev) => !prev);

  const broadcasts = useMemo(() => {
    if (!fixture.commentator) return [];
    const commentator: Commentator = {
      id: fixture.commentator.id,
      avatarUrl: fixture.commentator.avatarUrl ?? "/favicon.png",
      nickname: fixture.commentator.nickname,
      streams: [],
    };
    const streams: StreamSource[] = [];
    if (fixture.commentator.streamSourceFhd)
      streams.push({ id: 3, referenceId: null, name: "FHD", commentator, sourceUrl: fixture.commentator.streamSourceFhd });
    if (fixture.commentator.streamSourceHd)
      streams.push({ id: 2, referenceId: null, name: "HD", commentator, sourceUrl: fixture.commentator.streamSourceHd });
    if (fixture.commentator.streamSourceSd)
      streams.push({ id: 1, referenceId: null, name: "SD", commentator, sourceUrl: fixture.commentator.streamSourceSd });
    return [{ commentator, streams }];
  }, [fixture.commentator]);

  const playerProps = useMemo(
    () => ({
      title: fixture.title,
      poster: "/default-player-poster.png",
      broadcasts,
      status: fixture.isLive ? ("READY" as const) : ("UPCOMING" as const),
      startTime: fixture.startTime,
    }),
    [fixture.title, broadcasts, fixture.isLive, fixture.startTime],
  );

  const playerState = useMemo(
    () => ({ cleanMode, handleToggle }),
    [cleanMode],
  );

  return (
    <section
      className={clsx("flex flex-col xl:grid xl:grid-cols-[1fr_360px] gap-2", cleanMode && "fixed bg-black z-90 inset-0 gap-0!")}
    >
      <PlayerBox props={playerProps} state={playerState} />
      <InteractBox chatChannelKeyId={null} isClientViewMode={cleanMode} referenceId={fixture.referenceId} />
    </section>
  );
};

export default PlayContainer;
