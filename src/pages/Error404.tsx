import { NavLink } from "react-router-dom";
import { MainLayout } from "../components/MainLayout";

export function Error404() {
  return (
    <MainLayout className="error-404" headline="404 Not Found" showBackButton>
      <p>Page Not Found (from react-router)</p>
      <p>
        <NavLink className="underline" to="/">
          Go Home
        </NavLink>
      </p>
    </MainLayout>
  );
}
