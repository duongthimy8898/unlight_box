import clsx from "clsx";
import type { Fixture } from "../../../shared/types/Fixture";
import Basic from "./Basic";
import Pinned from "./Pinned";

const FixtureCards = ({ type, fixtures }: { type: "basic" | "pinned"; fixtures: Fixture[] }) => {
  return (
    <ul className={clsx("grid gap-4", "grid-cols-1 md:grid-cols-2 lg:grid-cols-2", type === "basic" ? "xl:grid-cols-3 2xl:grid-cols-4" : "xl:grid-cols-3")}>
      {fixtures.map((fixture, idx) => (
        <li key={`${idx}.${fixture.id}-`}>{type === "basic" ? <Basic fixture={fixture} /> : <Pinned fixture={fixture} />}</li>
      ))}
    </ul>
  );
};

export default FixtureCards;
