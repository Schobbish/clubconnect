import { useEffect, useState } from "react";
import { ClubResultsView } from "../components/ClubResultsView";
import { NavBar } from "../components/NavBar";
import { ViewStyleSwitcher } from "../components/ViewStyleSwitcher";
import { ClubData } from "../models/clubTypes";
import { apiAxios } from "../util/api";
import { Sidebar } from "../components/Sidebar";

export function Home() {
  const [clubList, setClubList] = useState<ClubData[]>([]);

  useEffect(() => {
    apiAxios
      .get("/api/getTopClubs")
      .then((res) => {
        setClubList(res.data);
      })
      .catch(() => {
        console.error("failed to get club data");
      });
  }, []);

  return (
    <div className="home">
      <NavBar />
      <div className="home-main-content flex">
        <div className="px-2 mx-auto w-full max-w-5xl">
          <Sidebar />
          <div className="pt-4 pr-3 flex">
            <h1>Top Clubs</h1>
            <ViewStyleSwitcher />
          </div>
          <div className="pb-12">
            <ClubResultsView clubList={clubList} />
          </div>
        </div>
      </div>
    </div>
  );
}
