import { inferLogoSource } from "../util/misc";

export interface ClubCardProps {
  clubName?: string;
  clubLogo?: string;
}

export function ClubCard(props: ClubCardProps) {
  return (
    <div className="clubcard-container max-w-3xs">
      <img
        className="rounded-xl"
        src={inferLogoSource(props.clubLogo)}
        alt="gray box"
      />
      <div className="clubname text-center">{props.clubName}</div>
    </div>
  );
}
