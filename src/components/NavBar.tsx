import { Field, Form, Formik } from "formik";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import search from "../images/search.svg";

interface SearchFormValues {
  query: string;
}

export function NavBar() {
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
              query: ""
            }}
            onSubmit={(values: SearchFormValues) => {
              navigate(
                "/search?" + createSearchParams({ q: values.query.trim() })
              );
            }}
          >
            <Form>
              <div className="flex border">
                <Field
                  className="p-1 w-52 z-10"
                  id="query"
                  name="query"
                  placeholder="Search"
                />
                <button type="submit">
                  <img
                    className="p-1 bg-white border border-r-0 border-y-0"
                    src={search}
                    alt="search icon"
                  />
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
