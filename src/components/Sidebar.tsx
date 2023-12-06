import { isEmpty } from "lodash-es";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AllClubsDialog } from "./AllClubsDialog";
import { CategoryDialog, CategoryFilter } from "./CategoryDialog";
import { ScheduleDialog, ScheduleFilter } from "./ScheduleDialog";

export interface SidebarProps {
  /** true to show a back button */
  backButton?: boolean;
}

export function Sidebar(props: SidebarProps) {
  const [showClearFiltersDialog, setShowClearFiltersDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const navigate = useNavigate();
  const categoryFilter = useContext(CategoryFilter)[0];
  const scheduleFilter = useContext(ScheduleFilter)[0];

  function allClub() {
    if (
      categoryFilter.length > 0 ||
      (!isEmpty(scheduleFilter.filter) && scheduleFilter.enabled)
    ) {
      setShowClearFiltersDialog(!showClearFiltersDialog);
    } else {
      navigate("/search");
    }
  }

  return (
    <div className="sidebar-container top-0 h-screen pt-4 text-center">
      <div className="sticky">
        <div className="h-14 flex">
          <button
            className="button-primary ml-2 h-1/2 block"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          {props.backButton && (
            <button
              className="button-primary ml-auto h-1/2 block"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          )}
        </div>
        <div className="pl-3 pr-1 font-bold text-xl">
          <button className="mb-3 underline block" onClick={() => allClub()}>
            All Clubs
          </button>
          <button
            className="mb-6 underline block"
            onClick={() => navigate("/calendar")}
          >
            Calendar
          </button>
          <AllClubsDialog
            open={showClearFiltersDialog}
            onClose={() => setShowClearFiltersDialog(false)}
          />
          <p className="mb-1 font-bold text-base" style={{ fontSize: '24px' }}>Filter by:</p>
          <button
            className="mb-3 underline block"
            onClick={() => setShowCategoryDialog(!showCategoryDialog)}
          >
            Category
          </button>
          <CategoryDialog
            open={showCategoryDialog}
            onClose={() => setShowCategoryDialog(false)}
          />
          <button
            className="underline block"
            onClick={() => setShowScheduleDialog(!showScheduleDialog)}
          >
            Schedule
          </button>
          <ScheduleDialog
            open={showScheduleDialog}
            onClose={() => setShowScheduleDialog(false)}
          />
        </div>
      </div>
    </div>
  );
}
