import { ScrollRestoration } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Sidebar } from "./Sidebar";
import { ViewStyleSwitcher } from "./ViewStyleSwitcher";

export interface MainLayoutProps {
  /** classes to put on enclosing div */
  className: string;
  /** text to put in h1 */
  headline: string;
  /** puts the back button in the sidebar if true */
  showBackButton?: boolean;
  showViewStyleSwitcher?: boolean;
  children: React.ReactNode;
}

export function MainLayout(props: MainLayoutProps) {
  return (
    <div className={props.className}>
      <ScrollRestoration />
      <NavBar />
      <div className="w-full bg-orange-200">
        <div className="px-2 mx-auto max-w-5xl w-full flex flex-row-reverse">
          <Sidebar backButton={props.showBackButton} />
          <div className="border-r-2 w-full min-h-screen">
            <div className="pt-4 pr-3 flex">
              <h1>{props.headline}</h1>
              {props.showViewStyleSwitcher && <ViewStyleSwitcher />}
            </div>
            <div className="pb-12">{props.children}</div>
          </div>
        </div>
      </div>
      <div className="h-16 bg-green"></div>
    </div>
  );
}
