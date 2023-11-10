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
        <div key={dayOfWeek} className="text-center">
          {props.meetingSchedule[dayOfWeek]?.map((val) => (
            <div key={val.name} className="event pb-2">
              <div className="font-bold">{val.name} </div>
              <div className="underline">{val.clubName} </div>
              <div>Start: {convertMinutesToTime(val.startTime)} </div>
              <div>End: {convertMinutesToTime(val.endTime)} </div>
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
          {props.meetingSchedule[dayOfWeek]?.map((meetings) => (
            <div key={meetings.clubName}>
              <div className="font-bold event-name overflow-clip">
                {meetings.clubName === clubName ? meetings.name : " "}
              </div>
              <div className="start-time overflow-clip">
                {meetings.clubName === clubName
                  ? "Start: " + convertMinutesToTime(meetings.startTime)
                  : " "}
              </div>
              <div className="end-time overflow-clip">
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
