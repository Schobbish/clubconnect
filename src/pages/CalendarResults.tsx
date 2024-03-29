import { isUndefined } from "lodash-es";
import { useContext, useEffect, useState } from "react";
import { Calendar } from "../components/Calendar";
import { CategoryFilter } from "../components/CategoryDialog";
import { MainLayout } from "../components/MainLayout";
import { ScheduleFilter } from "../components/ScheduleDialog";
import { ExtendedMeetingSchedule } from "../models/meetingTypes";
import { apiAxios, getErrorMessage } from "../util/api";

export function CalendarResults() {
  const categoryFilter = useContext(CategoryFilter)[0];
  const scheduleFilter = useContext(ScheduleFilter)[0];
  const [meetingData, setMeetingData] = useState<ExtendedMeetingSchedule>();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    apiAxios
      .post(
        "/api/searchMeetings",
        scheduleFilter.enabled ? scheduleFilter.filter : {},
        {
          params: {
            categories: categoryFilter.join(",")
          }
        }
      )
      .then((res) => {
        setMeetingData(res.data);
        setErrorMessage("");
      })
      .catch((err) => {
        setErrorMessage(getErrorMessage(err));
      });
  }, [categoryFilter, scheduleFilter]);

  return (
    <MainLayout className="calendar" showBackButton headline="Calendar Results">
      <div className="mr-2 my-4">
        {errorMessage || isUndefined(meetingData) ? (
          <span className="api-error">{errorMessage}</span>
        ) : (
          <Calendar meetingSchedule={meetingData} />
        )}
      </div>
    </MainLayout>
  );
}
