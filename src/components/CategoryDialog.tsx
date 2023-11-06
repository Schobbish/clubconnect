import { Field, Form, Formik } from "formik";
import { noop } from "lodash-es";
import { createContext, useContext, useEffect, useState } from "react";
import { ReactState } from "../models/misc";
import { apiAxios, getErrorMessage } from "../util/api";
import { Dialog, DialogProps } from "./Dialog";

export interface CategoryDialogProps extends DialogProps {
  ignore?: string;
}

export const CategoryFilter = createContext<ReactState<string[]>>([[], noop]);

interface CategoryFormValues {
  category: string[];
}

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
      open={props.open}
      onClose={props.onClose}
    >
      <Formik
        initialValues={{ category: categoryFilter }}
        onSubmit={(values: CategoryFormValues) => {
          setCategoryFilter(values.category);
          props.onClose();
        }}
      >
        {() => (
          <Form>
            <h3 className="text-xl font-bold">Categories</h3>
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
                        name="category"
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
                    setCategoryFilter([]);
                    props.onClose();
                  }}
                >
                  Clear Filter
                </button>
              </>
            )}
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
