import { useEffect, useState } from "react";
import { ClubCard } from "../components/ClubCard";
import { NavBar } from "../components/NavBar";
import { apiAxios } from "../util/api";

export interface ClubData {
  [name: string]: {
    acronym: string;
    president: string;
    description: string;
  };
}

export function Home() {
  const [clubData, setClubData] = useState<ClubData>({});

  useEffect(() => {
    apiAxios
      .get("/api/clubs")
      .then((res) => {
        console.log(Object.keys(res.data));
        console.log(Object.keys(res.data)[1]);
        setClubData(res.data);
      })
      .catch(() => {
        console.error("failed to get club data");
      });
  }, []);

  return (
    <div className="home">
      <NavBar />
      <div className="px-2 mx-auto max-w-5xl">
        <h1>Top Clubs</h1>
        <div className="cards-container flex flex-wrap gap-5 pt-5">
          {Object.keys(clubData).map((club) => (
            <ClubCard clubName={club} key={club} />
          ))}
        </div>
      </div>
    </div>
  );
}
