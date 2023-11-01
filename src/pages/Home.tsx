import { useEffect, useState } from "react";
import { ClubResultsView } from "../components/ClubResultsView";
import { NavBar } from "../components/NavBar";
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
      <ClubResultsView title="Top Clubs" clubList={clubList} />
    </div>
  );
}
