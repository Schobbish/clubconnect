import { useState } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import { CategoryFilter } from "./components/CategoryDialog";
import { ViewStyle } from "./components/ViewStyleSwitcher";
import { Club } from "./pages/Club";
import { Error404 } from "./pages/Error404";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route path="/club" element={<Club />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<Error404 />} />
    </>
  ),
  { basename: process.env.PUBLIC_URL }
);

export function App() {
  const viewStyleState = useState("grid");
  const categoryFilterState = useState<string[]>([]);

  return (
    <ViewStyle.Provider value={viewStyleState}>
      <CategoryFilter.Provider value={categoryFilterState}>
        <RouterProvider router={router} />
      </CategoryFilter.Provider>
    </ViewStyle.Provider>
  );
}
