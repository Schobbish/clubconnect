import discordClyde from "../images/social_icons/icon_clyde_black_RGB.svg";
import instagramIcon from "../images/social_icons/instagram.svg";
import facebookIcon from "../images/social_icons/facebook.svg";

interface DisplayIconsProps {
  social: string;
  socialsLink?: string;
}

export function DisplayIcons(props: DisplayIconsProps) {
  return (
    <>
      {props.socialsLink ? (
        <div className="social-icons flex flex-wrap">
          {props.social === "Instagram" ? (
            <a className="px-1" href={props.socialsLink}>
              <img className="h-[24px]" src={instagramIcon} />
            </a>
          ) : (
            ""
          )}

          {props.social === "Discord" ? (
            <a href={props.socialsLink}>
              <img className="h-[24px] px-1" src={discordClyde} />
            </a>
          ) : (
            ""
          )}

          {props.social === "Facebook" ? (
            <a href={props.socialsLink}>
              <img className="h-[24px] px-1" src={facebookIcon} />
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
