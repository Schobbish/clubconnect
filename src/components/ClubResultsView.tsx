import { defaultTo, shuffle } from "lodash-es";
import { useMemo, useState } from "react";
import gridIcon from "../images/grid.svg";
import listIcon from "../images/list.svg";
import { ClubData } from "../models/ClubData";
import { ClubCard } from "./ClubCard";
import { ClubListItem } from "./ClubListItem";

export interface ClubResultsViewProps {
  title: string;
  clubData: ClubData;
  /** Array of club names to specify display order (default: random) */
  order?: string[];
}

export function ClubResultsView(props: ClubResultsViewProps) {
  const [viewStyle, setViewStyle] = useState("grid");
  // stops it from reshuffling on viewStyle update
  const inferredOrder = useMemo(
    () => defaultTo(props.order, shuffle(Object.keys(props.clubData))),
    [props]
  );

  return (
    <div className="px-2 pt-4 pb-12 mx-auto max-w-5xl">
      <div className="flex">
        <h1 className="font-bold text-3xl">{props.title}</h1>
        <button
          className="ml-auto my-auto"
          onClick={() =>
            viewStyle === "grid" ? setViewStyle("list") : setViewStyle("grid")
          }
        >
          <img src={viewStyle === "grid" ? listIcon : gridIcon} />
        </button>
      </div>
      <div className="cards-container flex flex-wrap gap-5 pt-5">
        {viewStyle === "grid"
          ? inferredOrder.map((clubName) => (
              <ClubCard
                clubName={clubName}
                key={clubName}
                clubLogo={props.clubData[clubName].logo}
              />
            ))
          : inferredOrder.map((clubName) => (
              <ClubListItem
                key={clubName}
                clubName={clubName}
                clubDescription={props.clubData[clubName].description}
                clubPresident={props.clubData[clubName].president}
                clubLogo={props.clubData[clubName].logo}
              />
            ))}
      </div>
    </div>
  );
}
