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

/**
 * Converts the club json file to an array of ClubData with contents and order
 * defined by `clubNames`.
 */
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

/**
 * Converts the time in minutes into clock time
 */
export function convertMinutesToTime(minutesTime: number) {
  const meridiem = Math.floor(minutesTime / 60) > 12 ? "PM" : "AM";
  const hours =
    Math.floor(minutesTime / 60) > 12
      ? Math.floor(minutesTime / 60) - 12
      : Math.floor(minutesTime / 60);
  const minutes = minutesTime % 60 == 0 ? "00" : minutesTime % 60;

  return hours + ":" + minutes + meridiem;
}
