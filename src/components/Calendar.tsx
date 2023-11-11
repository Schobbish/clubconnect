import { Link, createSearchParams } from "react-router-dom";
import { MeetingSchedule, weekOrder } from "../models/meetingTypes";
import { convert24HourTime } from "../util/misc";

interface CalendarProps {
  meetingSchedule: MeetingSchedule;
  clubName?: string;
}

//This is here as the name entials, to avoid jumping through too many hoops to get the acronym from the club json (thought it was easier to do it this way)
function convertToAcronynm(clubName: string) {
  return clubName
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), "")
    .replace(/[^A-Z]/g, "");
}

function sortMeetingSchedules(props: CalendarProps) {
  //Sorts the meeting schedule
  weekOrder.map((dayOfWeek) =>
    props.meetingSchedule[dayOfWeek]?.sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    })
  );
}

function getAllEvents(props: CalendarProps) {
  return (
    <div className="calendar-events grid grid-cols-7 divide-x">
      {weekOrder.map((dayOfWeek) => (
        <div key={dayOfWeek} className="text-center px-2">
          {props.meetingSchedule[dayOfWeek]?.map((val) => (
            <div key={val.clubName + val.name} className="event pb-2">
              <div className="font-bold">{val.name} </div>
              <div className="underline">
                <Link
                  to={"/club?" + createSearchParams({ name: val.clubName })}
                >
                  {convertToAcronynm(val.clubName).length >= 3
                    ? convertToAcronynm(val.clubName)
                    : val.clubName}
                </Link>
              </div>
              <div>Start: {convert24HourTime(val.startTime)} </div>
              <div>End: {convert24HourTime(val.endTime)} </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function getClubEvents(props: CalendarProps, clubName: string) {
  return (
    <div className="calendar-events grid grid-cols-7 divide-x">
      {/*This goes through each day of the week */}
      {weekOrder.map((dayOfWeek) => (
        <div key={dayOfWeek} className="text-center h-[127.5px]">
          {/*This goes through each event in the day of the week */}
          {props.meetingSchedule[dayOfWeek]
            ?.filter((meeting) => meeting.clubName === clubName)
            .map((meeting) => (
              <div key={meeting.name}>
                <div className="font-bold event-name overflow-clip">
                  {meeting.name}
                </div>
                <div className="start-time overflow-clip">
                  {"Start: " + convert24HourTime(meeting.startTime)}
                </div>
                <div className="end-time overflow-clip">
                  {"End: " + convert24HourTime(meeting.endTime)}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export function Calendar(props: CalendarProps) {
  sortMeetingSchedules(props);
  return (
    <div className="calendar-outer border-2">
      <div className="calendar-daysOfWeek border-b-2 grid grid-cols-7 divide-x">
        {weekOrder.map((dayOfWeek) => (
          <div key={dayOfWeek} className="text-center overflow-clip">
            {dayOfWeek}
          </div>
        ))}
      </div>
      {props.clubName
        ? getClubEvents(props, props.clubName)
        : getAllEvents(props)}
    </div>
  );
}
