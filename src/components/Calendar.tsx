import { weekOrder, MeetingSchedule } from "../models/meetingTypes";
import { convertMinutesToTime } from "../util/misc";

interface CalendarProps {
  meetingSchedule: MeetingSchedule;
  clubName?: string;
}

function getAllEvents(props: CalendarProps) {
  return (
    <div className="calendar-events grid grid-cols-7 divide-x">
      {weekOrder.map((dayOfWeek) => (
        <div key={dayOfWeek} className="text-center h-[127.5px]">
          <div className="font-bold">
            {props.meetingSchedule[dayOfWeek]?.map((val) => val.name)}
          </div>

          {props.meetingSchedule[dayOfWeek]?.map(
            (val) => "Starts: " + convertMinutesToTime(val.startTime)
          )}
          <br />

          {props.meetingSchedule[dayOfWeek]?.map(
            (val) => "Ends: " + convertMinutesToTime(val.endTime)
          )}
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
          {props.meetingSchedule[dayOfWeek]?.map((meetings) => (
            <div key={meetings.clubName}>
              <div className="font-bold event-name">
                {meetings.clubName === clubName ? meetings.name : " "}
              </div>
              <div className="start-time">
                {meetings.clubName === clubName
                  ? "Start: " + convertMinutesToTime(meetings.startTime)
                  : " "}
              </div>
              <div className="end-time">
                {meetings.clubName === clubName
                  ? "End: " + convertMinutesToTime(meetings.endTime)
                  : " "}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Calendar(props: CalendarProps) {
  return (
    <div className="calendar-outer border-2">
      <div className="calendar-month text-center font-bold text-3xl border-b-2">
        November
      </div>
      <div className="calendar-daysOfWeek border-b-2 grid grid-cols-7 divide-x">
        {weekOrder.map((dayOfWeek) => (
          <div key={dayOfWeek} className="text-center">
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
