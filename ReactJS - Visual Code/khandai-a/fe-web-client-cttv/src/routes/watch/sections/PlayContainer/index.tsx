import { useMemo, useState } from "react";
import type { Fixture } from "../../../../shared/types/Fixture";
import InteractBox from "./InteractBox";
import PlayerBox from "./PlayerBox";
import clsx from "clsx";
import type { FixtureStats } from "../../../../shared/types/FixtureStats";

const PlayContainer = ({ fixture, fixtureStats }: { fixture: Fixture; fixtureStats: FixtureStats | undefined }) => {
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
      className={clsx(
        "mt-4 flex flex-col xl:grid xl:grid-cols-[1fr_360px] gap-2",
        cleanMode && "mt-0! fixed backdrop-blur backdrop-brightness-50 z-100 inset-0 gap-0!",
      )}
    >
      <PlayerBox props={playerProps} state={playerState} />
      <InteractBox chatChannelKeyId={fixture.fixtureCommentators.at(0)?.commentator.chatChannelKeyId} isClientViewMode={cleanMode} referenceId={fixture.referenceId} fixtureStats={fixtureStats} />
    </section>
  );
};

export default PlayContainer;
