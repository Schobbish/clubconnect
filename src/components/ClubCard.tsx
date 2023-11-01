import { Link, createSearchParams } from "react-router-dom";
import { inferLogoSource } from "../util/misc";

export interface ClubCardProps {
  clubName: string;
  clubLogo?: string;
}

export function ClubCard(props: ClubCardProps) {
  return (
    <Link to={"/club?" + createSearchParams({ name: props.clubName })}>
      <div className="clubcard-container max-w-3xs">
        <div className="image-container h-48">
          <img
            className="rounded-xl"
            src={inferLogoSource(props.clubLogo)}
            alt="gray box"
          />
        </div>
        <div className="clubname text-center pt-1 font-medium">
          {props.clubName}
        </div>
      </div>
    </Link>
  );
}
