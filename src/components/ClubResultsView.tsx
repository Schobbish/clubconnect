import { useContext } from "react";
import { ClubData } from "../models/clubTypes";
import { ClubCard } from "./ClubCard";
import { ClubListItem } from "./ClubListItem";
import { ViewStyle, ViewStyleSwitcher } from "./ViewStyleSwitcher";

export interface ClubResultsViewProps {
  title: string;
  clubList: ClubData[];
  /** If set, this message will be displayed instead of club items */
  errorMessage?: string;
}

export function ClubResultsView(props: ClubResultsViewProps) {
  const viewStyle = useContext(ViewStyle)[0];

  return (
    <div className="px-2 pt-4 pb-12 mx-auto max-w-5xl">
      <div className="flex">
        <h1 className="font-bold text-3xl">{props.title}</h1>
        <ViewStyleSwitcher />
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
