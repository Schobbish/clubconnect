import { useEffect, useState } from "react";
import { ClubCard } from "../components/ClubCard";
import { NavBar } from "../components/NavBar";
import { ClubData } from "../models/ClubData";
import { apiAxios } from "../util/api";

export interface SearchResultsProps {
  searchQuery?: string;
}

export function SearchResults() {
  const [clubData, setClubData] = useState<ClubData>({});

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
    <div className="search-results">
      <NavBar />
      <div className="cards-container flex flex-wrap gap-5 pt-5">
        {Object.keys(clubData).map((club) => (
          <ClubCard clubName={club} key={club} />
        ))}
      </div>
    </div>
  );
}
