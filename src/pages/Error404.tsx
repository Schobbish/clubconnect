import { NavLink } from "react-router-dom";

export function Error404() {
  return (
    <div className="error-404 flex justify-center items-center min-h-screen text-white bg-red-950">
      <div className="text-center">
        <h1 className="pb-1 text-2xl">404 Not Found (from react-router)</h1>
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </div>
    </div>
  );
}
