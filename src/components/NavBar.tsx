import { Field, Form, Formik } from "formik";
import { defaultTo } from "lodash-es";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams
} from "react-router-dom";
import calendarIcon from "../images/calendar.svg";
import logo from "../images/logo.png";
import searchIcon from "../images/search.svg";

interface SearchFormValues {
  query: string;
}

export function NavBar() {
  const searchParams = useSearchParams()[0];
  const navigate = useNavigate();

  return (
    <div className="navbar-outer bg-gray">
      <div className="navbar-inner flex flex-wrap px-2 mx-auto max-w-5xl">
        <Link
          className="flex items-center py-2 pr-2 mx-auto sm:mx-0 h-16"
          to="/"
        >
          <img className="logo h-12" src={logo} alt="ClubConnect logo" />
        </Link>
        <div className="flex items-center mx-auto sm:mr-0 h-16">
          <Formik
            initialValues={{
              query: defaultTo(searchParams.get("q"), "")
            }}
            onSubmit={(values: SearchFormValues) => {
              navigate(
                "/search?" + createSearchParams({ q: values.query.trim() })
              );
            }}
          >
            <Form>
              <div className="flex gap-2">
                <div className="flex border">
                  <Field
                    className="p-1 w-52"
                    id="query"
                    name="query"
                    placeholder="Search"
                  />
                  <button type="submit">
                    <img
                      className="p-1 bg-white border border-r-0 border-y-0"
                      src={searchIcon}
                      alt="search icon"
                    />
                  </button>
                </div>
                <button
                  className="flex border"
                  onClick={() => navigate("/calendar")}
                >
                  <img src={calendarIcon} alt="calendar icon" />
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
