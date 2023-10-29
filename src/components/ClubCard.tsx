import { defaultTo } from "lodash-es";
import defaultLogo from "../images/Default Logo.png";

export interface ClubCardProps {
  clubName?: string;
  clubLogo?: string;
  clubAcronym?: string;
}

export function ClubCard(props: ClubCardProps) {
  return (
    <div className="clubcard-container max-w-3xs ">
      <img src={defaultTo(props.clubLogo, defaultLogo)} alt="gray box" />
      <div className="clubname text-center">{props.clubName}</div>
    </div>
  );
}
