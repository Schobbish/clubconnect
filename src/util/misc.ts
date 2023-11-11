import * as DateFns from "date-fns";
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

/** Converts a string in 24 hour time to one in 12 hour time */
export function convert24HourTime(time: string) {
  return DateFns.format(DateFns.parse(time, "HH:mm", new Date(0)), "h:mma");
}

/**
 * Joins a array using commas and a conjuction
 * @param array The array to join
 * @param conjunction The word that goes before the last item
 * @param singularBase Prepend this string to result iff array is length 1
 * @param pluralBase Prepend this string to result iff array is not length 1
 */
export function humanArrayJoiner(
  array: string[],
  conjunction = "and",
  singularBase = "",
  pluralBase = ""
) {
  let result = "";
  const sep = array.length > 2 ? ", " : " ";
  if (array.length > 1) {
    result += pluralBase;
    array.forEach((val, i) => {
      console.log(i === array.length - 1 ? conjunction + " " + val : val + sep);
      return (result +=
        i === array.length - 1 ? conjunction + " " + val : val + sep);
    });
  } else if (array.length === 1) {
    result += singularBase + array[0];
  }
  return result;
}
