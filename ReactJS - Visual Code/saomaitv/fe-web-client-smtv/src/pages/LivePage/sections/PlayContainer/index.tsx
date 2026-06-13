import { useMemo, useState } from "react";
import type { Fixture } from "../../../../shared/types/Fixture";
import InteractBox from "./InteractBox";
import PlayerBox from "./PlayerBox";
import clsx from "clsx";

const PlayContainer = ({ fixture }: { fixture: Fixture }) => {
  const [cleanMode, setCleanMode] = useState<boolean>(false);
  const handleToggle = () => setCleanMode((prev) => !prev);
  const broadcasts = useMemo(
    () =>
      fixture.fixtureCommentators.map((c) => ({
        commentator: c.commentator,
        streams: c.commentator.streams,
      })),
    [fixture.fixtureCommentators],
  );
  const playerProps = useMemo(
    () => ({
      title: fixture.title,
      poster: "/default-player-poster.png",
      broadcasts: broadcasts,
      status: fixture.isLive ? ("READY" as "READY" | "UPCOMING") : ("UPCOMING" as "READY" | "UPCOMING"),
      startTime: fixture.startTime,
    }),
    [fixture.title, broadcasts, fixture.isLive, fixture.startTime],
  );
  const playerState = useMemo(
    () => ({
      cleanMode,
      handleToggle,
    }),
    [cleanMode],
  );
  return (
    <section
      className={clsx("flex flex-col xl:grid xl:grid-cols-[1fr_360px] gap-2", cleanMode && "fixed bg-black z-90 inset-0 gap-0!")}
    >
      <PlayerBox props={playerProps} state={playerState} />
      <InteractBox chatChannelKeyId={fixture.chatChannelKeyId} isClientViewMode={cleanMode} referenceId={fixture.referenceId} />
    </section>
  );
};

export default PlayContainer;
