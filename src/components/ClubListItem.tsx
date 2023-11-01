import { inferLogoSource } from "../util/misc";

export interface ClubListItemProps {
  clubName?: string;
  clubLogo?: string;
  clubAcronym?: string;
  clubDescription?: string;
  clubPresident?: string;
}

export function ClubListItem(props: ClubListItemProps) {
  return (
    <div className="listclub-container flex flex-wrap">
      <img
        className="max-w-3xs rounded-xl"
        src={inferLogoSource(props.clubLogo)}
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
