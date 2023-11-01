import { useState } from "react";
import gridIcon from "../images/grid.svg";
import listIcon from "../images/list.svg";
import { ClubData } from "../models/clubTypes";
import { ClubCard } from "./ClubCard";
import { ClubListItem } from "./ClubListItem";

export interface ClubResultsViewProps {
  title: string;
  clubList: ClubData[];
  /** If set, this message will be displayed instead of club items */
  errorMessage?: string;
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
        {props.errorMessage ? (
          <span className="api-error">{props.errorMessage}</span>
        ) : viewStyle === "grid" ? (
          props.clubList.map((club) => (
            <ClubCard name={club.name} logo={club.logo} key={club.name} />
          ))
        ) : (
          props.clubList.map((club) => (
            <ClubListItem
              name={club.name}
              description={club.description}
              president={club.president}
              logo={club.logo}
              key={club.name}
            />
          ))
        )}
      </div>
    </div>
  );
}
