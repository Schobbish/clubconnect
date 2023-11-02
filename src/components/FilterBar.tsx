import { Formik } from "formik";
import { defaultTo } from "lodash-es";
import {
  createSearchParams,
  useNavigate,
  useSearchParams
} from "react-router-dom";

interface FilterFormValues {
  query: string;
}

export function FilterBar() {
  const searchParams = useSearchParams()[0];
  const navigate = useNavigate();
  return (
    <div className="filter-bar-container w-full bg-gray">
      <Formik
        initialValues={{ query: defaultTo(searchParams.get("q"), "") }}
        onSubmit={(values: FilterFormValues) => {
          navigate("/search?" + createSearchParams({ q: values.query.trim() }));
        }}
      >
        <button type="submit">Search</button>
      </Formik>
    </div>
  );
}
