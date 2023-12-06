import { isEmpty } from "lodash-es";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CategoryFilter } from "./CategoryDialog";
import { Dialog, DialogProps } from "./Dialog";
import { ScheduleFilter } from "./ScheduleDialog";

export type AllClubsDialogProps = Omit<DialogProps, "className" | "children">;

export function AllClubsDialog(props: AllClubsDialogProps) {
  const setCategoryFilter = useContext(CategoryFilter)[1];
  const [scheduleFilter, setScheduleFilter] = useContext(ScheduleFilter);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Dialog className="clear-filters-dialog w-full max-w-xs" {...props}>
      <h3>This disables active filters</h3>
      <p className="mb-2">Proceed?</p>
      <button
        className="button-primary mr-2"
        type="button"
        onClick={() => {
          setCategoryFilter([]);
          // don't disable if empty
          if (!isEmpty(scheduleFilter.filter))
            setScheduleFilter({ ...scheduleFilter, enabled: false });
          // don't navigate away from calendar
          if (location.pathname !== "/calendar") navigate("/search");
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
