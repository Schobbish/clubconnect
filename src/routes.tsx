import { Route, createRoutesFromElements } from "react-router-dom";
import { App } from "./App";
import "./index.css";
import { CalendarResults } from "./pages/CalendarResults";
import { Club } from "./pages/Club";
import { Error404 } from "./pages/Error404";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/club" element={<Club />} />
    <Route path="/search" element={<Search />} />
    <Route path="/calendar" element={<CalendarResults />} />
    <Route path="*" element={<Error404 />} />
  </Route>
);
