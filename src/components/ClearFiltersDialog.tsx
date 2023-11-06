import { useContext } from "react";
import { Dialog, DialogProps } from "./Dialog";
import { CategoryFilter } from "./CategoryDialog";

export interface ClearFiltersDialogProps extends DialogProps {
  className?: never;
  children?: never;
}

export function ClearFiltersDialog(props: ClearFiltersDialogProps) {
  const setCategoryFilter = useContext(CategoryFilter)[1];

  return (
    <Dialog
      className="clear-filters-dialog p-2 w-full max-w-xs bg-gray border-2"
      {...props}
    >
      <h3 className="text-xl font-bold">This clears all filters</h3>
      <p className="mb-2">Proceed?</p>
      <button
        className="button-primary mr-2"
        type="button"
        onClick={() => {
          setCategoryFilter([]);
          props.onClose();
        }}
      >
        Yes
      </button>
      <button
        className="button-secondary"
        type="button"
        onClick={() => props.onClose()}
      >
        Cancel
      </button>
    </Dialog>
  );
}