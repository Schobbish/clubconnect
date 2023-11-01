import { defaultTo, shuffle } from "lodash-es";
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
  const viewStyle = "Grid"; // eventually use a usestate
  const inferredOrder = defaultTo(
    props.order,
    shuffle(Object.keys(props.clubData))
  );

  return (
    <div className="px-2 pt-4 pb-12 mx-auto max-w-5xl">
      <h1 className="font-bold text-3xl">{props.title}</h1>
      <div className="cards-container flex flex-wrap gap-5 pt-5">
        {viewStyle !== "Grid"
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
