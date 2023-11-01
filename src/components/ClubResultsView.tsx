import { useContext } from "react";
import { ClubData } from "../models/clubTypes";
import { ClubCard } from "./ClubCard";
import { ClubListItem } from "./ClubListItem";
import { ViewStyle } from "./ViewStyleSwitcher";

export interface ClubResultsViewProps {
  clubList: ClubData[];
}

export function ClubResultsView(props: ClubResultsViewProps) {
  const viewStyle = useContext(ViewStyle)[0];

  return (
    <div className="cards-container flex flex-wrap gap-5 pt-5">
      {viewStyle === "grid"
        ? props.clubList.map((club) => (
            <ClubCard name={club.name} logo={club.logo} key={club.name} />
          ))
        : props.clubList.map((club) => (
            <ClubListItem
              name={club.name}
              description={club.description}
              president={club.president}
              logo={club.logo}
              key={club.name}
            />
          ))}
    </div>
  );
}
