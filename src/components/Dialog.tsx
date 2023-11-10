import { useEffect, useRef } from "react";

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
  // close on escape
  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") props.onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // disable body scrolling when open (try to)
  const bodyRef = useRef<HTMLDivElement>(null);
  const stopScrolling = (e: WheelEvent | TouchEvent) => {
    if (
      // check if dialog does not need to be scrolled
      // n.b. this only monitors the dialog-body div so scrolling
      //     of children will still be disabled
      (bodyRef.current?.scrollHeight === bodyRef.current?.clientHeight &&
        bodyRef.current?.scrollWidth === bodyRef.current?.clientWidth) ||
      // if it does, check if dialog is not targeted
      // (overscroll-contain will then stop scrolling of body)
      (e.target instanceof Node && !bodyRef.current?.contains(e.target))
    ) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (props.open) {
      document.addEventListener("wheel", stopScrolling, { passive: false });
      document.addEventListener("touchmove", stopScrolling, { passive: false });
    } else {
      document.removeEventListener("wheel", stopScrolling);
      document.removeEventListener("touchmove", stopScrolling);
    }

    return () => {
      document.removeEventListener("wheel", stopScrolling);
      document.removeEventListener("touchmove", stopScrolling);
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
            "dialog-body overflow-auto p-2 max-h-full text-base font-normal text-left bg-gray border-2 overscroll-contain " +
            props.className
          }
          onClick={(e) => e.stopPropagation()}
          ref={bodyRef}
        >
          {props.children}
        </div>
      </div>
    );
}
