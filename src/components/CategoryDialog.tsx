import { Field, Form, Formik } from "formik";
import { noop } from "lodash-es";
import { createContext, useContext, useEffect, useState } from "react";
import { DisableableFilter, ReactState } from "../models/misc";
import { apiAxios, getErrorMessage } from "../util/api";
import { Dialog, DialogProps } from "./Dialog";

export const intiialCategoryFilterValue = {
  enabled: true,
  filter: []
};
export const CategoryFilter = createContext<
  ReactState<DisableableFilter<string[]>>
>([intiialCategoryFilterValue, noop]);

export type CategoryDialogProps = Omit<DialogProps, "className" | "children">;

export function CategoryDialog(props: CategoryDialogProps) {
  const [categoryFilter, setCategoryFilter] = useContext(CategoryFilter);
  const [categoryList, setCategoryList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    apiAxios
      .get("/api/getCategories")
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {
        setErrorMessage(getErrorMessage(err));
      });
  }, []);

  return (
    <Dialog
      className="category-dialog p-2 w-full max-w-lg bg-gray border-2"
      {...props}
    >
      <Formik
        initialValues={categoryFilter}
        onSubmit={(values: DisableableFilter<string[]>) => {
          setCategoryFilter(values);
          props.onClose();
        }}
      >
        {() => (
          <Form>
            <h3>Categories</h3>
            <p className="mb-1">Select categories you would like to see</p>
            {errorMessage ? (
              <span className="api-error">{errorMessage}</span>
            ) : (
              <>
                <div className="mb-2">
                  {categoryList.map((val) => (
                    <label className="block" key={val}>
                      <Field
                        className="mr-1"
                        type="checkbox"
                        name="filter"
                        value={val}
                      />
                      {val}
                    </label>
                  ))}
                </div>
                <button className="button-primary mr-2" type="submit">
                  Apply Filter
                </button>
                <button
                  className="button-secondary"
                  type="button"
                  onClick={() => {
                    setCategoryFilter(intiialCategoryFilterValue);
                    props.onClose();
                  }}
                >
                  Clear Filter
                </button>
                <label>
                  <Field className="ml-4 mr-1" type="checkbox" name="enabled" />
                  Enabled
                </label>
              </>
            )}
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
