import { ReactElement, useEffect } from "react";

export interface DialogProps {
  /** classes applied to body of dialog */
  className?: string;
  /** dialog shows iff true */
  open: boolean;
  /** called when esc or the backdrop is clicked */
  onClose: () => void;
  children?: ReactElement;
}

export function Dialog(props: DialogProps) {
  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") props.onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  if (!props.open) return null;
  else
    return (
      <div
        className="dialog-backdrop fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex items-center justify-center"
        onClick={props.onClose}
      >
        <div
          className={"dialog-body " + props.className}
          onClick={(e) => e.stopPropagation()}
        >
          {props.children}
        </div>
      </div>
    );
}
