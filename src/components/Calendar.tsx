import { weekOrder, MeetingSchedule } from "../models/meetingTypes";

interface CalendarProps {
  meetingSchedule: MeetingSchedule;
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
      <div className="calendar-events grid grid-cols-7 divide-x">
        {weekOrder.map((dayOfWeek) => (
          <div key={dayOfWeek} className="text-center h-[127.5px]">
            <div className="font-bold">
              {props.meetingSchedule[dayOfWeek]?.map((val) => val.name)}
            </div>
            {props.meetingSchedule[dayOfWeek]?.map(
              (val) =>
                "Starts: " +
                (Math.floor(val.startTime / 60) > 12
                  ? Math.floor(val.startTime / 60) - 12
                  : Math.floor(val.startTime / 60)) +
                ":" +
                (val.startTime % 60 == 0 ? "00" : val.startTime % 60) +
                (Math.floor(val.startTime / 60) > 12 ? "PM" : "AM")
            )}
            <br />
            {props.meetingSchedule[dayOfWeek]?.map(
              (val) =>
                "Ends: " +
                (Math.floor(val.endTime / 60) > 12
                  ? Math.floor(val.endTime / 60) - 12
                  : Math.floor(val.endTime / 60)) +
                ":" +
                (val.endTime % 60 == 0 ? "00" : val.endTime % 60) +
                (Math.floor(val.endTime / 60) > 12 ? "PM" : "AM")
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
