import { useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { CategoryFilter } from "./components/CategoryDialog";
import { ViewStyle } from "./components/ViewStyleSwitcher";

export function App() {
  const viewStyleState = useState("grid");
  const categoryFilterState = useState<string[]>([]);

  return (
    <ViewStyle.Provider value={viewStyleState}>
      <CategoryFilter.Provider value={categoryFilterState}>
        <ScrollRestoration />
        <Outlet />
      </CategoryFilter.Provider>
    </ViewStyle.Provider>
  );
}
