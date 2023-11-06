import { NavLink } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Sidebar } from "../components/Sidebar";

export function Error404() {
  return (
    <div className="error-404">
      <NavBar />
      <div className="home-main-content flex">
        <div className="px-2 mx-auto w-full max-w-5xl">
          <Sidebar backButton />
          <div className="pt-4 pr-3 flex">
            <h1>404 Not Found</h1>
          </div>
          <div className="pb-12">
            <p>Page Not Found (from react-router)</p>
            <p>
              <NavLink className="underline" to="/">
                Go Home
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
