import { MeetingSchedule } from "../models/meetingTypes";

export const meetings: MeetingSchedule = {
  Sunday: [],
  Monday: [],
  Tuesday: [
    {
      name: "General Meeting",
      clubName: "Filipino Student Association",
      startTime: 1170,
      endTime: 1290
    },
    {
      name: "General Meeting",
      clubName: "Vietnamese Student Association",
      startTime: 1170,
      endTime: 1290
    }
  ],
  Wednesday: [],
  Thursday: [
    {
      name: "General Meeting",
      clubName: "Vietnamese Student Association",
      startTime: 1170,
      endTime: 1290
    }
  ],
  Friday: [
    {
      name: "General Meeting",
      clubName: "Filipino Student Association",
      startTime: 1170,
      endTime: 1290
    }
  ],
  Saturday: []
};
