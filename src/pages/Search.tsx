import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ClubResultsView } from "../components/ClubResultsView";
import { NavBar } from "../components/NavBar";
import { ClubData } from "../models/ClubData";
import { apiAxios } from "../util/api";
import { defaultTo } from "lodash-es";

export function Search() {
  const [clubData, setClubData] = useState<ClubData>({});
  const searchParams = useSearchParams()[0];
  const query = defaultTo(searchParams.get("q"), "").toLowerCase();
  const clubOrder = Object.keys(clubData)
    .filter((clubName) => clubName.toLowerCase().includes(query))
    .sort((a, b) => {
      // really inefficient since it keeps converting to lowercase
      const lowerCaseA = a.toLowerCase();
      const lowerCaseB = b.toLowerCase();
      // sort by index query appears at in the name
      const queryIndexA = lowerCaseA.indexOf(query);
      const queryIndexB = lowerCaseB.indexOf(query);

      if (queryIndexA === queryIndexB) {
        // tiebreaker: compare normally (ignoring case)
        return lowerCaseA.localeCompare(lowerCaseB);
      } else {
        return queryIndexA - queryIndexB;
      }
    });

  useEffect(() => {
    apiAxios
      .get("/api/clubs")
      .then((res) => {
        setClubData(res.data);
      })
      .catch(() => {
        console.error("failed to get club data");
      });
  }, []);

  return (
    <div className="search">
      <NavBar />
      <ClubResultsView
        title="Search Results"
        clubData={clubData}
        order={clubOrder}
      />
    </div>
  );
}
