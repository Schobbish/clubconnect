import { useEffect, useState } from "react";
import { ClubResultsView } from "../components/ClubResultsView";
import { MainLayout } from "../components/MainLayout";
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
    <MainLayout className="home" showViewStyleSwitcher headline="Top Clubs">
      <ClubResultsView clubList={clubList} />
    </MainLayout>
  );
}
