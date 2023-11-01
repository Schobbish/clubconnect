import { useEffect, useState } from "react";
import { apiAxios } from "../util/api";
import { ClubData } from "../models/ClubData";
import { useSearchParams } from "react-router-dom";
import { defaultTo } from "lodash-es";

export function Club() {
  const [clubData, setClubData] = useState<ClubData>({});
  const searchParams = useSearchParams()[0];
  const query = defaultTo(searchParams.get("q"), "").toLowerCase();
  console.log(searchParams); //somehow not getting the correct query values from the Clubcard
  console.log(query);
  console.log(clubData); //just to avoid the warning lol

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
    <div className="club-info-container">
      This will contain the club information
      <div className="club-contact-info-container">
        This is where all the emails and socials should be contained (maybe some
        icons)
      </div>
    </div>
  );
}
