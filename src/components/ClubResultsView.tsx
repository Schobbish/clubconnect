import { useState } from "react";
import gridIcon from "../images/grid.svg";
import listIcon from "../images/list.svg";
import { ClubData } from "../models/clubTypes";
import { ClubCard } from "./ClubCard";
import { ClubListItem } from "./ClubListItem";

export interface ClubResultsViewProps {
  title: string;
  clubList: ClubData[];
}

export function ClubResultsView(props: ClubResultsViewProps) {
  const [viewStyle, setViewStyle] = useState("grid");

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
          ? props.clubList.map((club) => (
              <ClubCard
                clubName={club.name}
                clubLogo={club.logo}
                key={club.name}
              />
            ))
          : props.clubList.map((club) => (
              <ClubListItem
                clubName={club.name}
                clubDescription={club.description}
                clubPresident={club.president}
                clubLogo={club.logo}
                key={club.name}
              />
            ))}
      </div>
    </div>
  );
}
