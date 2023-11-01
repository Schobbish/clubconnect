import { noop } from "lodash-es";
import { createContext, useContext } from "react";
import gridIcon from "../images/grid.svg";
import listIcon from "../images/list.svg";

type ViewStyleContext = [string, React.Dispatch<React.SetStateAction<string>>];
export const ViewStyle = createContext<ViewStyleContext>(["grid", noop]);

export function ViewStyleSwitcher() {
  const [viewStyle, setViewStyle] = useContext(ViewStyle);

  return (
    <button
      className="ml-auto my-auto"
      onClick={() =>
        viewStyle === "grid" ? setViewStyle("list") : setViewStyle("grid")
      }
    >
      <img src={viewStyle === "grid" ? listIcon : gridIcon} />
    </button>
  );
}
