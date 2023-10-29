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
      <div className="navbar-inner flex mx-auto max-w-5xl">
        <Link to="/">
          <img
            className="logo justify-self-start my-0.5 h-12"
            src={logo}
            alt="ClubConnect logo"
          />
        </Link>
        <div className="ml-auto">
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
            <Form className="flex items-center h-full">
              <div className="flex border">
                <Field
                  className="p-1"
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
