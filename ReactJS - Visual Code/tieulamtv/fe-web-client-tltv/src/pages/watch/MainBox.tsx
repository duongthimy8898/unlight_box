import { createContext, useState } from "react";
import watchRoute from "../../app/routes/watch.route";
import type { Fixture } from "../../shared/types/Fixture";
import InteractBox from "./InteractBox";
import PlayerBox from "./PlayerBox";
import clsx from "clsx";

type ViewMode = "normal" | "fullscreen";

type ViewContextType = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

const ViewContext = createContext<ViewContextType | undefined>(undefined);

const MainBox = ({ fixture }: { fixture: Fixture }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("normal");
  const { blv } = watchRoute.useSearch();
  const broadcast = fixture.fixtureCommentators.find((fc) => fc.commentator.id === blv);
  return (
    <ViewContext.Provider value={{ viewMode, setViewMode }}>
      <section
        className={clsx(
          "mt-4 flex flex-col lg:flex-row items-stretch",
          viewMode === "fullscreen" && "mt-0! fixed! inset-0! z-90! no-scroll",
        )}
      >
        <div className="w-full lg:flex-1">
          <PlayerBox broadcast={broadcast!} />
        </div>
        <div
          className={clsx(
            "w-full h-150 lg:w-[320px] lg:h-auto shrink-0",
            viewMode === "fullscreen" && "flex-1! h-auto! lg:flex-none!",
          )}
        >
          <InteractBox />
        </div>
      </section>
    </ViewContext.Provider>
  );
};

export default MainBox;
export { ViewContext };
