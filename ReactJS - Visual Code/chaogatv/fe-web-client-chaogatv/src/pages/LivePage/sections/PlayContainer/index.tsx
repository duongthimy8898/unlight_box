import { useState } from "react";
import type { Fixture } from "../../../../shared/types/Fixture";
import InteractBox from "./InteractBox";
import PlayerBox from "./PlayerBox";
import clsx from "clsx";

const PlayContainer = ({ fixture }: { fixture: Fixture }) => {
  const [cleanMode, setCleanMode] = useState<boolean>(false);
  const handleToggle = () => setCleanMode((prev) => !prev);
  // console.log(cleanMode);
  // console.log(fixture.title);
  return (
    <section className={clsx("flex flex-col xl:grid xl:grid-cols-[1fr_360px] gap-2", cleanMode && "fixed backdrop-blur backdrop-brightness-50 z-10 inset-0 gap-0!")}>
      <PlayerBox
        props={{
          title: fixture.title,
          poster: "/default-player-poster.png",
          broadcasts: fixture?.fixtureCommentators.map((c) => ({
            commentator: c.commentator,
            streams: c.commentator.streams,
          })),
          status: fixture.isLive ? "READY" : "UPCOMING",
          startTime: fixture.startTime,
        }}
        state={{ cleanMode, handleToggle }}
      />
      <InteractBox chatChannelKeyId={fixture.chatChannelKeyId} isClientViewMode={cleanMode} referenceId={fixture.referenceId} />
    </section>
  );
};

export default PlayContainer;
