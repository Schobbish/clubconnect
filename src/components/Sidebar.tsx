import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryDialog } from "./CategoryDialog";

export interface SidebarProps {
  /** true to show a back button */
  backButton?: boolean;
}

export function Sidebar(props: SidebarProps) {
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showScheduleFilter, setShowScheduleFilter] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="sidebar-container border-l-2 sticky top-0 float-right h-screen pt-4 text-center">
      <div className="sticky">
        <div className="h-14">
          {props.backButton && (
            <button
              className="bg-orange-500 border ml-auto block p-0.5"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          )}
        </div>
        <div className="pl-3 pr-1 font-bold text-xl">
          <button className="mb-6 underline block">All Clubs</button>
          <p className="mb-1 font-normal text-base">Filter by:</p>
          <button
            className="mb-3 underline block"
            onClick={() => setShowCategoryFilter(!showCategoryFilter)}
          >
            Category
          </button>
          <CategoryDialog
            open={showCategoryFilter}
            onClose={() => setShowCategoryFilter(false)}
          />
          <button
            className="underline block"
            onClick={() => setShowScheduleFilter(!showScheduleFilter)}
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
