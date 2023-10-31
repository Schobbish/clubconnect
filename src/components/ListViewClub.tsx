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
      <img
        className="max-w-3xs rounded-xl"
        src={defaultTo(props.clubLogo, defaultLogo)}
        alt="gray box"
      />
      <div className="club-information pl-10">
        <div className="clubName underline font-bold text-2xl">
          {props.clubName}
        </div>
        <div className="clubDescription max-w-3xl pt-2 pb-2">
          {props.clubDescription}
        </div>
        <div className="clubPresident underline">
          President: {props.clubPresident}
        </div>
      </div>
    </div>
  );
}
