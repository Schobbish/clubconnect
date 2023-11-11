import { Calendar } from "../components/Calendar";
import { MainLayout } from "../components/MainLayout";
import { meetings } from "../mocks/meetings";

export function CalendarResults() {
  return (
    <MainLayout className="calendar" headline="Calendar Results">
      <Calendar meetingSchedule={meetings} />
    </MainLayout>
  );
}
