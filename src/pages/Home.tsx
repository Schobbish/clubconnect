import { useEffect, useState } from "react";
import { ClubCard } from "../components/ClubCard";
import { ListViewClub } from "../components/ListViewClub";
import { NavBar } from "../components/NavBar";
import { ClubData } from "../models/ClubData";
import { apiAxios } from "../util/api";

export function Home() {
  const [clubData, setClubData] = useState<ClubData>({});
  const viewStyle = "Grid"; //eventually use a usestate

  useEffect(() => {
    apiAxios
      .get("/api/clubs")
      .then((res) => {
        //console.log(Object.keys(res.data));
        //console.log(Object.keys(res.data)[1]);
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
          {viewStyle !== "Grid"
            ? Object.keys(clubData).map((club) => (
                <ClubCard
                  clubName={club}
                  key={club}
                  clubLogo={clubData[club].logo}
                />
              ))
            : Object.keys(clubData).map((club) => (
                <ListViewClub
                  key={club}
                  clubName={club}
                  clubDescription={clubData[club].description}
                  clubPresident={clubData[club].president}
                  clubLogo={clubData[club].logo}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
