import { Field, Formik } from "formik";
import { Form, createSearchParams, useNavigate } from "react-router-dom";

export function FilterBar() {
  const navigate = useNavigate();

  return (
    <div className="filter-bar-container w-full bg-gray border--2">
      <div className="">
        <Formik
          initialValues={{ toggle: false, checked: [] }}
          onSubmit={() => {
            navigate("/filter?" + createSearchParams({}));
          }}
        >
          {({ values }) => (
            <Form>
              <label>
                <Field type="checkbox" name="toggle" />
                {`${values.toggle}`}
              </label>

              <div id="checkbox-group">Checked</div>
              <div role="group" aria-labelledby="checkbox-group">
                <label>
                  <Field type="checkbox" name="checked" value="One" />
                  One
                </label>
                <label>
                  <Field type="checkbox" name="checked" value="Two" />
                  Two
                </label>
                <label>
                  <Field type="checkbox" name="checked" value="Three" />
                  Three
                </label>
              </div>

              <button className="border-2" type="submit">
                Search
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
