import { useEffect, useState } from "react";
import { ClubResultsView } from "../components/ClubResultsView";
import { NavBar } from "../components/NavBar";
import { ViewStyleSwitcher } from "../components/ViewStyleSwitcher";
import { ClubData } from "../models/clubTypes";
import { apiAxios } from "../util/api";

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
      <div className="px-2 pt-4 pb-12 mx-auto max-w-5xl">
        <div className="flex">
          <h1 className="font-bold text-3xl">Top Clubs</h1>
          <ViewStyleSwitcher />
        </div>
        <ClubResultsView clubList={clubList} />
      </div>
    </div>
  );
}
