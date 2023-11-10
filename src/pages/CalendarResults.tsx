import { Calendar } from "../components/Calendar";
import { meetings } from "../mocks/meetings";

export function CalendarResults() {
  return <Calendar meetingSchedule={meetings} />;
}
