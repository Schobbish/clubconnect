import { noop } from "lodash-es";
import { createContext, useContext } from "react";
import gridIcon from "../images/grid.svg";
import listIcon from "../images/list.svg";
import { ReactState } from "../models/misc";

export const ViewStyle = createContext<ReactState<string>>(["grid", noop]);

export function ViewStyleSwitcher() {
  const [viewStyle, setViewStyle] = useContext(ViewStyle);

  return (
    <button
      className="ml-auto self-start"
      onClick={() =>
        viewStyle === "grid" ? setViewStyle("list") : setViewStyle("grid")
      }
    >
      <img src={viewStyle === "grid" ? listIcon : gridIcon} />
    </button>
  );
}
