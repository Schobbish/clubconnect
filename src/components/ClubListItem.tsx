import { Link, createSearchParams } from "react-router-dom";
import { inferLogoSource } from "../util/misc";

export interface ClubListItemProps {
  name: string;
  logo?: string;
  acronym?: string;
  description?: string;
  president?: string;
}

//Need to adjust logo size and truncating text for when the list view gets a certain height

export function ClubListItem(props: ClubListItemProps) {
  return (
    <Link to={"/club?" + createSearchParams({ name: props.name })}>
      <div className="listclub-container flex flex-wrap">
        <img
          className="max-w-3xs rounded-xl object-cover"
          src={inferLogoSource(props.logo)}
          alt={props.name + " logo"}
        />
        <div className="club-information pl-10 ">
          <div className="clubName underline font-bold text-2xl max-w-[580px]">
            {props.name}
          </div>
          <div className="clubDescription max-w-xl pt-2 line-clamp-5">
            {props.description}
          </div>
          <div className="clubPresident underline pt-2">
            President: {props.president}
          </div>
        </div>
      </div>
    </Link>
  );
}
