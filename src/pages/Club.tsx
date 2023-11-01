import { defaultTo, isUndefined } from "lodash-es";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ClubData } from "../models/ClubData";
import { apiAxios } from "../util/api";

export function Club() {
  const [clubData, setClubData] = useState<ClubData>({});
  const searchParams = useSearchParams()[0];
  const name = defaultTo(searchParams.get("name"), "");

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
        <br />
        {name}
        <br />
        {!isUndefined(clubData[name]) && clubData[name].description}
      </div>
    </div>
  );
}
