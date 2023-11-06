import { defaultTo, isUndefined } from "lodash-es";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "../components/MainLayout";
import { ClubData } from "../models/clubTypes";
import { apiAxios, getErrorMessage } from "../util/api";
import { inferLogoSource } from "../util/misc";

export function Club() {
  const [clubData, setClubData] = useState<ClubData>();
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams()[0];
  const name = defaultTo(searchParams.get("name"), "");

  useEffect(() => {
    apiAxios
      .get("/api/getClub", { params: { name } })
      .then((res) => {
        setClubData(res.data);
      })
      .catch((err) => {
        setErrorMessage(getErrorMessage(err));
      });
  }, [name]);

  return (
    <MainLayout className="club" headline="Club Details" showBackButton>
      {errorMessage || isUndefined(clubData) ? (
        <span className="api-error">{errorMessage}</span>
      ) : (
        <div>
          <div className="my-4 md:flex">
            <img
              className="rounded-xl max-w-xs pr-2 w-full"
              src={inferLogoSource(clubData.logo)}
              alt={name + " logo"}
            />
            <div className="mt-2 md:mt-auto max-w-2xl">
              <h1 className="mb-2">{name}</h1>
              This will contain the club information including meeting times
              <div className="club-contact-info-container">
                This is where all the emails and socials should be contained
                (maybe some icons)
              </div>
            </div>
          </div>
          {clubData.description}
        </div>
      )}
    </MainLayout>
  );
}
