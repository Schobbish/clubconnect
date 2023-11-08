export interface Meeting {
  name: string;
  startTime: number;
  endTime: number;
}

export const weekOrder = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
] as const;
type DayOfWeek = (typeof weekOrder)[number];

export type MeetingSchedule = { [Day in DayOfWeek]?: Meeting[] };
