import { useEffect } from "react";

export interface DialogProps {
  /** classes applied to body of dialog */
  className?: string;
  /** dialog shows iff true */
  open: boolean;
  /** called when esc or the backdrop is clicked */
  onClose: () => void;
  children?: React.ReactNode;
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
  }, []);

  // disable body scrolling when open
  // https://www.reddit.com/r/nextjs/comments/1312tna/comment/jhyhyu7/
  useEffect(() => {
    if (props.open) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [props.open]);

  if (!props.open) return null;
  else
    return (
      <div
        className="dialog-backdrop fixed top-0 left-0 flex justify-center items-center p-4 w-full h-full bg-black/60 backdrop-blur-sm"
        onClick={props.onClose}
      >
        <div
          className={
            "dialog-body overflow-y-scroll max-h-full text-base font-normal text-left " +
            props.className
          }
          onClick={(e) => e.stopPropagation()}
        >
          {props.children}
        </div>
      </div>
    );
}
