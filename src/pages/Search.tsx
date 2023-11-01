import { defaultTo } from "lodash-es";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ClubResultsView } from "../components/ClubResultsView";
import { NavBar } from "../components/NavBar";
import { ClubData } from "../models/clubTypes";
import { apiAxios } from "../util/api";

export function Search() {
  const [clubList, setClubList] = useState<ClubData[]>([]);
  const searchParams = useSearchParams()[0];
  const query = defaultTo(searchParams.get("q"), "").toLowerCase();

  useEffect(() => {
    apiAxios
      .get("/api/searchClubs", { params: { q: query } })
      .then((res) => {
        setClubList(res.data);
      })
      .catch(() => {
        console.error("failed to get club data");
      });
  }, []);

  return (
    <div className="search">
      <NavBar />
      <ClubResultsView title="Search Results" clubList={clubList} />
    </div>
  );
}
