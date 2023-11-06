import { defaultTo } from "lodash-es";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ClubResultsView } from "../components/ClubResultsView";
import { NavBar } from "../components/NavBar";
import { ViewStyleSwitcher } from "../components/ViewStyleSwitcher";
import { ClubData } from "../models/clubTypes";
import { apiAxios, getErrorMessage } from "../util/api";
import { Sidebar } from "../components/Sidebar";

export function Search() {
  const [clubList, setClubList] = useState<ClubData[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams()[0];
  const query = defaultTo(searchParams.get("q"), "").toLowerCase();

  useEffect(() => {
    apiAxios
      .get("/api/searchClubs", { params: { q: query } })
      .then((res) => {
        setClubList(res.data);
      })
      .catch((err) => setErrorMessage(getErrorMessage(err)));
  }, [query]);

  return (
    <div className="search">
      <NavBar />
      <div className="flex">
        <div className="px-2 mx-auto w-full max-w-5xl">
          <Sidebar backButton />
          <div className="pt-4 pr-3 flex">
            <h1>Search Results</h1>
            <ViewStyleSwitcher />
          </div>
          {errorMessage ? (
            <span className="api-error">{errorMessage}</span>
          ) : (
            <div className="pb-12">
              <ClubResultsView clubList={clubList} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
