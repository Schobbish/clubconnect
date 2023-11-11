import { useContext, useEffect, useState } from "react";
import { CategoryFilter } from "../components/CategoryDialog";
import { ClubResultsView } from "../components/ClubResultsView";
import { MainLayout } from "../components/MainLayout";
import { ClubData } from "../models/clubTypes";
import { apiAxios, getErrorMessage } from "../util/api";

export function Home() {
  const categoryFilter = useContext(CategoryFilter)[0];
  const [clubList, setClubList] = useState<ClubData[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    apiAxios
      .get("/api/searchClubs", {
        params: {
          categories: categoryFilter.enabled
            ? categoryFilter.filter.join(",")
            : "",
          shuffle: true,
          limit: 8
        }
      })
      .then((res) => {
        setClubList(res.data);
      })
      .catch((err) => setErrorMessage(getErrorMessage(err)));
  }, [categoryFilter]);

  return (
    <MainLayout className="home" showViewStyleSwitcher headline="Top Clubs">
      {errorMessage ? (
        <span className="api-error">{errorMessage}</span>
      ) : (
        <div className="pb-12">
          <ClubResultsView clubList={clubList} />
        </div>
      )}
    </MainLayout>
  );
}
