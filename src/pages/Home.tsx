import { useEffect, useState } from "react";
import { ClubResultsView } from "../components/ClubResultsView";
import { NavBar } from "../components/NavBar";
import { ClubData } from "../models/ClubData";
import { apiAxios } from "../util/api";

export function Home() {
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
    <div className="home">
      <NavBar />
      <ClubResultsView title="Top Clubs" clubData={clubData} />
    </div>
  );
}
