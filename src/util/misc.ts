import { isUndefined } from "lodash-es";
import defaultLogo from "../images/Default Logo.png";
import { ClubData, ClubJson } from "../models/clubTypes";

/**
 * Returns the proper image source for a given club logo
 * If src is undefined, a default logo will be returned.
 */
export function inferLogoSource(src: string | undefined) {
  return isUndefined(src) ? defaultLogo : process.env.PUBLIC_URL + src;
}

export function createClubList(
  clubJson: ClubJson,
  clubNames: string[]
): ClubData[] {
  return clubNames.map((val) => {
    return {
      name: val,
      ...clubJson[val]
    };
  });
}
