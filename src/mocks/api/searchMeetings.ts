import { defaultTo, unset } from "lodash-es";
import { rest } from "msw";
import { MeetingSchedule, weekOrder } from "../../models/meetingTypes";
import { clubJson } from "../clubJson";
import { meetings } from "../meetings";

/**
 * Search club meetings with a schedule filter.
 * This is a POST request to facilitate passing in the filter. Optionally
 *     pass a MeetingSchedule object in the request body to apply it.
 * @param clubName Optionally filter meetings to this club name only.
 * @param categories Optional comma-separated list of categories. All returned
 *     events must be from clubs that are in at least one of these categories.
 *     Note: ignored if clubName is specified
 * @returns A MeetingSchedule object whose meetings reflect the request filters.
 */
export const searchMeetings = rest.post(
  process.env.PUBLIC_URL + "/api/searchMeetings",
  async (req, res, ctx) => {
    return req
      .json<MeetingSchedule>()
      .then((body) => {
        const clubNameParam = defaultTo(
          req.url.searchParams.get("clubName"),
          ""
        );
        let allowedClubNames =
          clubNameParam.length === 0 ? Object.keys(clubJson) : [clubNameParam];

        if (clubNameParam.length === 0) {
          const categoriesParam = defaultTo(
            req.url.searchParams.get("categories"),
            ""
          );
          if (categoriesParam.length !== 0) {
            const categories = categoriesParam.split(",");
            console.log(categories);
            allowedClubNames = allowedClubNames.filter((clubName) => {
              categories
                .map((val) => clubJson[clubName].categories.includes(val))
                .includes(true);
            });
          }
        }
        console.log(body);

        const schedule: MeetingSchedule = {};
        for (const day of weekOrder) {
          schedule[day] = [];
          for (const meeting of defaultTo(meetings[day], [])) {
            if (
              // check if clubName is in the allowed list (inefficient)
              allowedClubNames.includes(meeting.clubName) &&
              req.bodyUsed &&
              // check if meeting is outside any blocks
              !defaultTo(body[day], [])
                .map((block) => {
                  console.log(meeting, block);
                  return (
                    meeting.endTime <= block.startTime ||
                    meeting.startTime >= block.endTime
                  );
                })
                .includes(false)
            )
              schedule[day]?.push(meeting);
          }
          if (schedule[day]?.length === 0) unset(schedule, day);
        }

        if (Object.keys(schedule).length === 0) {
          return res(ctx.status(404), ctx.json("No events found"));
        } else {
          return res(ctx.status(200), ctx.json<MeetingSchedule>(schedule));
        }
      })
      .catch(() => {
        return res(ctx.status(400), ctx.json("Bad request: bad JSON"));
      });
  }
);
