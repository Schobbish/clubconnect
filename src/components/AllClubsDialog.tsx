import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryFilter } from "./CategoryDialog";
import { Dialog, DialogProps } from "./Dialog";

export type AllClubsDialogProps = Omit<DialogProps, "className" | "children">;

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
