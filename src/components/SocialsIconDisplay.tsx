import discordClyde from "../images/icon_clyde_black_RGB.svg";
import instagramIcon from "../images/instagram.svg";

interface DisplayIconsProps {
  social: string;
  socialsLink?: string;
}

export function DisplayIcons(props: DisplayIconsProps) {
  return (
    <>
      {props.socialsLink ? (
        <div className="social-icons flex flex-wrap">
          {props.social === "Instagram" && props.socialsLink != "" ? (
            <a className="pr-2" href={props.socialsLink}>
              <img className="h-[24px]" src={instagramIcon} />
            </a>
          ) : (
            ""
          )}

          {props.social === "Discord" && props.socialsLink != "" ? (
            <a href={props.socialsLink}>
              <img className="h-[24px]" src={discordClyde} />
            </a>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
