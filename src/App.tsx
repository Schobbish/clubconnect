import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
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

export default function App() {
  return <RouterProvider router={router} />;
}
