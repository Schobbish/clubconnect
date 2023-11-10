export interface Meeting {
  name: string;
  clubName: string;
  /** meeting start time in 24-hour format HH:mm with leading zeros */
  startTime: string;
  /** meeting end time in 24-hour format HH:mm with leading zeros */
  endTime: string;
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
export type DayOfWeek = (typeof weekOrder)[number];

export type MeetingSchedule = { [Day in DayOfWeek]?: Meeting[] };
