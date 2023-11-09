import { weekOrder } from "../models/meetingTypes";

export function Calendar() {
  return (
    <div className="calendar-outer border-2">
      <div className="calendar-month text-center font-bold text-3xl border-b-2">
        November
      </div>
      <div className="calendar-daysOfWeek grid grid-cols-7 divide-x">
        {weekOrder.map((dayOfWeek) => (
          <div key={dayOfWeek} className="text-center">
            {dayOfWeek}
          </div>
        ))}
      </div>
    </div>
  );
}
