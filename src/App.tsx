import { useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import {
  CategoryFilter,
  intiialCategoryFilterValue
} from "./components/CategoryDialog";
import {
  ScheduleFilter,
  initalScheduleFilterValue
} from "./components/ScheduleDialog";
import { ViewStyle } from "./components/ViewStyleSwitcher";
import { MeetingSchedule } from "./models/meetingTypes";
import { DisableableFilter } from "./models/misc";

export function App() {
  const viewStyleState = useState("grid");
  const categoryFilterState = useState<DisableableFilter<string[]>>(
    intiialCategoryFilterValue
  );
  const scheduleFilterState = useState<DisableableFilter<MeetingSchedule>>(
    initalScheduleFilterValue
  );

  return (
    <ViewStyle.Provider value={viewStyleState}>
      <CategoryFilter.Provider value={categoryFilterState}>
        <ScheduleFilter.Provider value={scheduleFilterState}>
          <Outlet />
          <ScrollRestoration />
        </ScheduleFilter.Provider>
      </CategoryFilter.Provider>
    </ViewStyle.Provider>
  );
}
