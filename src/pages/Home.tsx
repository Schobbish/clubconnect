import { useContext, useEffect, useState } from "react";
import { CategoryFilter } from "../components/CategoryDialog";
import { ClubResultsView } from "../components/ClubResultsView";
import { MainLayout } from "../components/MainLayout";
import { ClubData } from "../models/clubTypes";
import { apiAxios } from "../util/api";

export function Home() {
  const categoryFilter = useContext(CategoryFilter)[0];
  const [clubList, setClubList] = useState<ClubData[]>([]);

  useEffect(() => {
    apiAxios
      .get("/api/searchClubs", {
        params: {
          q: "",
          categories: categoryFilter.join(","),
          shuffle: true,
          limit: 6
        }
      })
      .then((res) => {
        setClubList(res.data);
      })
      .catch(() => {
        console.error("failed to get club data");
      });
  }, [categoryFilter]);

  return (
    <MainLayout className="home" showViewStyleSwitcher headline="Top Clubs">
      <ClubResultsView clubList={clubList} />
    </MainLayout>
  );
}
