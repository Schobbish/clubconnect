import { MeetingSchedule } from "../models/meetingTypes";

export const meetings: MeetingSchedule = {
  Sunday: [],
  Monday: [],
  Tuesday: [
    {
      name: "General Meeting",
      clubName: "Filipino Student Association",
      startTime: "19:30",
      endTime: "21:30"
    },
    {
      name: "General Meeting",
      clubName: "Vietnamese Student Association",
      startTime: "19:30",
      endTime: "21:30"
    }
  ],
  Wednesday: [],
  Thursday: [
    {
      name: "General Meeting",
      clubName: "Vietnamese Student Association",
      startTime: "19:30",
      endTime: "21:30"
    }
  ],
  Friday: [
    {
      name: "General Meeting",
      clubName: "Filipino Student Association",
      startTime: "19:30",
      endTime: "21:30"
    }
  ],
  Saturday: []
};
