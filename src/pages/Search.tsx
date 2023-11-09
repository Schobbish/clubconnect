import { defaultTo } from "lodash-es";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CategoryFilter } from "../components/CategoryDialog";
import { ClubResultsView } from "../components/ClubResultsView";
import { MainLayout } from "../components/MainLayout";
import { ClubData } from "../models/clubTypes";
import { apiAxios, getErrorMessage } from "../util/api";

export function Search() {
  const categoryFilter = useContext(CategoryFilter)[0];
  const [clubList, setClubList] = useState<ClubData[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams()[0];
  const query = defaultTo(searchParams.get("q"), "").toLowerCase();

  useEffect(() => {
    apiAxios
      .get("/api/searchClubs", {
        params: { q: query, categories: categoryFilter.join(",") }
      })
      .then((res) => {
        setClubList(res.data);
        setErrorMessage("");
      })
      .catch((err) => setErrorMessage(getErrorMessage(err)));
  }, [query, categoryFilter]);

  return (
    <MainLayout
      className="search"
      headline="Search Results"
      showBackButton
      showViewStyleSwitcher
    >
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
