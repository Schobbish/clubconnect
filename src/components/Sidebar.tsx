import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryDialog } from "./CategoryDialog";
import { ClearFiltersDialog } from "./ClearFiltersDialog";

export interface SidebarProps {
  /** true to show a back button */
  backButton?: boolean;
}

export function Sidebar(props: SidebarProps) {
  const [showClearFiltersDialog, setShowClearFiltersDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="sidebar-container border-l-2 sticky top-0 float-right h-screen pt-4 text-center">
      <div className="sticky">
        <div className="h-14">
          {props.backButton && (
            <button
              className="button-primary ml-auto block"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          )}
        </div>
        <div className="pl-3 pr-1 font-bold text-xl">
          <button
            className="mb-6 underline block"
            onClick={() => setShowClearFiltersDialog(!showClearFiltersDialog)}
          >
            All Clubs
          </button>
          <ClearFiltersDialog
            open={showClearFiltersDialog}
            onClose={() => setShowClearFiltersDialog(false)}
          />
          <p className="mb-1 font-normal text-base">Filter by:</p>
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
        </div>
      </div>
    </div>
  );
}
