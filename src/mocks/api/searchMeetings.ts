import { defaultTo, unset } from "lodash-es";
import { rest } from "msw";
import {
  ExtendedMeeting,
  ExtendedMeetingSchedule,
  Meeting,
  weekOrder
} from "../../models/meetingTypes";
import { humanArrayJoiner } from "../../util/misc";
import { clubJson } from "../clubJson";
import { meetings } from "../meetings";

function addClubInfoToMeeting(meeting: Meeting): ExtendedMeeting {
  console.log(meeting.clubName in clubJson);
  if (meeting.clubName in clubJson) {
    return {
      ...meeting,
      clubLogo: clubJson[meeting.clubName].logo,
      clubAcronym: clubJson[meeting.clubName].acronym
    };
  } else {
    return { ...meeting, clubLogo: "", clubAcronym: "" };
  }
}

/**
 * Search club meetings with a schedule filter.
 * This is a POST request to facilitate passing in the filter. Optionally pass
 *     an ExtendedMeetingSchedule object in the request body to apply it.
 * @param clubName Optionally filter meetings to this club name only.
 * @param categories Optional comma-separated list of categories. All returned
 *     events must be from clubs that are in at least one of these categories.
 *     Note: ignored if clubName is specified
 * @returns An ExtendedMeetingSchedule object whose
 *     meetings reflect the request filters.
 */
export const searchMeetings = rest.post(
  process.env.PUBLIC_URL + "/api/searchMeetings",
  async (req, res, ctx) => {
    return req
      .json<ExtendedMeetingSchedule>()
      .then((body) => {
        const clubNameParam = defaultTo(
          req.url.searchParams.get("clubName"),
          ""
        );
        let allowedClubNames =
          clubNameParam.length === 0 ? Object.keys(clubJson) : [clubNameParam];

        const categoriesParam = defaultTo(
          req.url.searchParams.get("categories"),
          ""
        );
        const categories = categoriesParam.split(",");
        if (clubNameParam.length === 0 && categoriesParam.length !== 0) {
          allowedClubNames = allowedClubNames.filter((clubName) =>
            categories
              .map((val) => clubJson[clubName].categories.includes(val))
              .includes(true)
          );
        }

        const schedule: ExtendedMeetingSchedule = {};
        if (Object.keys(body).length === 0) {
          // default to meetings if body is empty
          // but need to add logos and acronyms
          for (const day of weekOrder) {
            schedule[day] = [];
            for (const meeting of defaultTo(meetings[day], [])) {
              schedule[day]?.push(addClubInfoToMeeting(meeting));
            }
          }
        } else {
          for (const day of weekOrder) {
            schedule[day] = [];
            for (const meeting of defaultTo(meetings[day], [])) {
              if (
                // check if clubName is in the allowed list (inefficient)
                allowedClubNames.includes(meeting.clubName) &&
                // check if meeting is inside any blocks
                defaultTo(body[day], [])
                  .map(
                    (block) =>
                      meeting.startTime >= block.startTime &&
                      meeting.endTime <= block.endTime
                  )
                  .includes(true)
              )
                schedule[day]?.push(addClubInfoToMeeting(meeting));
            }
            if (schedule[day]?.length === 0) unset(schedule, day);
          }
        }

        if (Object.keys(schedule).length === 0) {
          let errorMessage = `No events found`;
          if (clubNameParam.length === 0) {
            if (Object.keys(body).length !== 0) {
              errorMessage += " that fit your schedule";
            }
            if (categoriesParam.length !== 0) {
              if (Object.keys(body).length !== 0) errorMessage += " and";
              errorMessage += humanArrayJoiner(
                categories,
                "or",
                " for clubs in your selected category: ",
                " for clubs in your selected categories: "
              );
            }
          } else {
            errorMessage += ` for club "${clubNameParam}"`;
          }

          return res(ctx.status(404), ctx.json(errorMessage + "."));
        } else {
          return res(
            ctx.status(200),
            ctx.json<ExtendedMeetingSchedule>(schedule)
          );
        }
      })
      .catch(() => {
        return res(ctx.status(400), ctx.json("Bad request: bad JSON"));
      });
  }
);
