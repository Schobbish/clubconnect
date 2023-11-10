import { defaultTo, isUndefined } from "lodash-es";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "../components/MainLayout";
import { ClubData, socialTypes } from "../models/clubTypes";
import { apiAxios, getErrorMessage } from "../util/api";
import { inferLogoSource } from "../util/misc";
import { DisplayIcons } from "../components/SocialsIconDisplay";

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
  //console.log(clubData?.socials?.["instagram"]);
  return (
    <MainLayout className="club" headline="Club Details" showBackButton>
      {errorMessage || isUndefined(clubData) ? (
        <span className="api-error">{errorMessage}</span>
      ) : (
        <div className="pr-2">
          <div className="my-4 md:flex">
            <img
              className="rounded-xl sm:max-w-xs w-full"
              src={inferLogoSource(clubData.logo)}
              alt={name + " logo"}
            />
            <div className="mt-2 md:mt-auto max-w-2xl md:pl-2">
              <h1 className="mb-2">{name}</h1>
              <div className="club-socials-container">
                <div className="club-socials-title font-semibold text-xl border-b-2">
                  Socials
                </div>
                <div className="flex flex-wrap pt-2">
                  {socialTypes.map((social) => (
                    <DisplayIcons
                      key={social}
                      social={social}
                      socialsLink={clubData.socials?.[social]}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {clubData.description}
        </div>
      )}
    </MainLayout>
  );
}

//clubData.socials?.[social]
