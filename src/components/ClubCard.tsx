import { Link, createSearchParams } from "react-router-dom";
import { inferLogoSource } from "../util/misc";

export interface ClubCardProps {
  name: string;
  logo?: string;
}

export function ClubCard(props: ClubCardProps) {
  return (
    <Link to={"/club?" + createSearchParams({ name: props.name })}>
      <div className="clubcard-container max-w-3xs">
        <div className="image-container flex items-center h-48">
          <img
            className="rounded-xl object-contain"
            src={inferLogoSource(props.logo)}
            alt={props.name + " logo"}
          />
        </div>
        <div className="clubname text-center pt-1 font-medium">
          {props.name}
        </div>
      </div>
    </Link>
  );
}
