import { useNavigate } from "react-router-dom";

export interface SidebarProps {
  /** true to show a back button */
  backButton?: boolean;
}

export function Sidebar(props: SidebarProps) {
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
          <button className="mb-3 underline block">Category</button>
          <button className="underline block">Schedule</button>
        </div>
      </div>
    </div>
  );
}
