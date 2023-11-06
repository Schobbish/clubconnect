import { useContext } from "react";
import { Dialog, DialogProps } from "./Dialog";
import { CategoryFilter } from "./CategoryDialog";
import { useNavigate } from "react-router-dom";

export interface AllClubsDialogProps extends DialogProps {
  className?: never;
  children?: never;
}

export function AllClubsDialog(props: AllClubsDialogProps) {
  const setCategoryFilter = useContext(CategoryFilter)[1];
  const navigate = useNavigate();

  return (
    <Dialog className="clear-filters-dialog w-full max-w-xs" {...props}>
      <h3>This clears all filters</h3>
      <p className="mb-2">Proceed?</p>
      <button
        className="button-primary mr-2"
        type="button"
        onClick={() => {
          setCategoryFilter([]);
          navigate("/search");
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
