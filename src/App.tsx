import { useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { CategoryFilter } from "./components/CategoryDialog";
import { ViewStyle } from "./components/ViewStyleSwitcher";
import {
  ScheduleFilter,
  ScheduleFilterContext,
  initalScheduleFilterValue
} from "./components/ScheduleDialog";

export function App() {
  const viewStyleState = useState("grid");
  const categoryFilterState = useState<string[]>([]);
  const scheduleFilterState = useState<ScheduleFilterContext>(
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
