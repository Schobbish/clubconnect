import { defaultTo, isUndefined } from "lodash-es";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { ClubData } from "../models/ClubData";
import { apiAxios } from "../util/api";
import { inferLogoSource } from "../util/misc";

export function Club() {
  const [clubData, setClubData] = useState<ClubData>({});
  const searchParams = useSearchParams()[0];
  const name = defaultTo(searchParams.get("name"), "");
  const navigate = useNavigate();

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
      <NavBar />
      <div className="px-2 pt-4 pb-12 mx-auto max-w-5xl">
        {/* temp back button */}
        <button className="bg-orange-500 border" onClick={() => navigate(-1)}>
          Back
        </button>
        <br />
        {isUndefined(clubData[name]) ? (
          <div>Club Not Found</div>
        ) : (
          <div>
            <div className="flex flex-wrap my-4 gap-2">
              <img
                className="rounded-xl max-w-xs"
                src={inferLogoSource(clubData[name].logo)}
                alt={name + " logo"}
              />
              <div className="mt-auto">
                <h1 className="font-bold text-3xl mb-2">{name}</h1>
                This will contain the club information including meeting times
                <div className="club-contact-info-container">
                  This is where all the emails and socials should be contained
                  (maybe some icons)
                </div>
              </div>
            </div>
            {clubData[name].description}
          </div>
        )}
      </div>
    </div>
  );
}
