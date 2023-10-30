import { defaultTo } from "lodash-es";
import defaultLogo from "../images/Default Logo.png";

export interface ClubCardProps {
  clubName?: string;
  clubLogo?: string;
  clubAcronym?: string;
  clubDescription?: string;
  clubPresident?: string;
}

export function ListViewClub(props: ClubCardProps) {
  return (
    <div className="listclub-container flex flex-wrap">
      <img src={defaultTo(props.clubLogo, defaultLogo)} alt="gray box" />
      <div className="club-information pl-10">
        <div className="clubName underline font-bold text-2xl">
          {props.clubName}
        </div>
        <div className="clubDescription">{props.clubDescription}</div>
        <div className="clubPresident">
          Current President: {props.clubPresident}
        </div>
      </div>
    </div>
  );
}
