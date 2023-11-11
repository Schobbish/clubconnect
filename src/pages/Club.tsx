import { defaultTo, isUndefined } from "lodash-es";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar } from "../components/Calendar";
import { MainLayout } from "../components/MainLayout";
import { DisplayIcons } from "../components/SocialsIconDisplay";
import { ClubData, socialTypes } from "../models/clubTypes";
import { MeetingSchedule } from "../models/meetingTypes";
import { apiAxios, getErrorMessage } from "../util/api";
import { inferLogoSource } from "../util/misc";

export function Club() {
  const [clubData, setClubData] = useState<ClubData>();
  const [clubErrorMessage, setClubErrorMessage] = useState("");
  const [meetingData, setMeetingData] = useState<MeetingSchedule>();
  const [meetingErrorMessage, setMeetingErrorMessage] = useState("");
  const searchParams = useSearchParams()[0];
  const name = defaultTo(searchParams.get("name"), "");

  useEffect(() => {
    apiAxios
      .get("/api/getClub", { params: { name } })
      .then((res) => {
        setClubData(res.data);
      })
      .catch((err) => {
        setClubErrorMessage(getErrorMessage(err));
      });

    apiAxios
      .post("/api/searchMeetings", {}, { params: { clubName: name } })
      .then((res) => {
        setMeetingData(res.data);
      })
      .catch((err) => {
        setMeetingErrorMessage(getErrorMessage(err));
      });
  }, [name]);

  return (
    <MainLayout className="club" headline="Club Details" showBackButton>
      {clubErrorMessage || isUndefined(clubData) ? (
        <span className="api-error">{clubErrorMessage}</span>
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
                <div className="club-socials-title border-b-2 w-1/2">
                  <h4>Socials</h4>
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
          <h3 className="pt-5 text-center">Weekly Events</h3>
          {meetingErrorMessage || isUndefined(meetingData) ? (
            <span className="api-error">{meetingErrorMessage}</span>
          ) : (
            <Calendar meetingSchedule={meetingData} clubName={name} />
          )}
        </div>
      )}
    </MainLayout>
  );
}
