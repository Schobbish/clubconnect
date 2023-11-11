import { Field, FieldArray, FieldProps, Form, Formik } from "formik";
import { defaultTo, noop } from "lodash-es";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import addIcon from "../images/add.svg";
import removeIcon from "../images/remove.svg";
import { DayOfWeek, MeetingSchedule, weekOrder } from "../models/meetingTypes";
import { ReactState } from "../models/misc";
import { Dialog, DialogProps } from "./Dialog";

export interface ScheduleFilterContext {
  // FUTURE if we want to apply this filter to search results, provide an
  //     option to disable the filter instead of clearing it entirely
  enabled: boolean;
  schedule: MeetingSchedule;
}
export const initalScheduleFilterValue: ScheduleFilterContext = {
  enabled: false,
  schedule: {}
};
export const ScheduleFilter = createContext<ReactState<ScheduleFilterContext>>([
  initalScheduleFilterValue,
  noop
]);

export type ScheduleDialogProps = Omit<DialogProps, "className" | "children">;

interface ScheduleFormValues {
  enabled: boolean;
  schedule: {
    day: DayOfWeek | "";
    startTime: string;
    endTime: string;
  }[];
}
const initialMeetingValue: ScheduleFormValues["schedule"][number] = {
  day: "",
  startTime: "",
  endTime: ""
};

function contextToFormValues(
  context: ScheduleFilterContext
): ScheduleFormValues {
  const schedule: ScheduleFormValues["schedule"] = [];

  for (const day of weekOrder) {
    for (const meeting of defaultTo(context.schedule[day], [])) {
      schedule.push({
        day,
        startTime: meeting.startTime,
        endTime: meeting.endTime
      });
    }
  }

  // add blank meeting if schedule is empty
  if (schedule.length === 0) schedule.push(initialMeetingValue);

  return { enabled: context.enabled, schedule };
}

function formValuesToContext(
  values: ScheduleFormValues
): ScheduleFilterContext {
  const schedule: ScheduleFilterContext["schedule"] = {};

  for (const meeting of values.schedule) {
    if (meeting.day !== "") {
      if (!(meeting.day in schedule)) schedule[meeting.day] = [];
      schedule[meeting.day]?.push({
        name: "",
        clubName: "",
        startTime: meeting.startTime,
        endTime: meeting.endTime
      });
    }
  }

  return { enabled: values.enabled, schedule };
}

function TimeField(props: FieldProps["field"]) {
  return <input type="time" {...props} />;
}

export function ScheduleDialog(props: ScheduleDialogProps) {
  const [scheduleFilter, setScheduleFilter] = useContext(ScheduleFilter);
  const navigate = useNavigate();

  return (
    <Dialog className="schedule-dialog p-2 bg-gray border-2" {...props}>
      <Formik
        initialValues={contextToFormValues(scheduleFilter)}
        onSubmit={(values: ScheduleFormValues) => {
          setScheduleFilter(formValuesToContext(values));
          navigate("/calendar");
          props.onClose();
        }}
      >
        {(form) => (
          <Form>
            <h3>Schedule</h3>
            <p className="mb-1">
              Enter your schedule to show events happening in your free time
            </p>
            <FieldArray name="schedule">
              {(fieldArray) => (
                <div className="min-h-[16rem]">
                  {form.values.schedule.map((val, i) => (
                    <div className="flex whitespace-nowrap mb-1" key={i}>
                      <label className="flex">
                        Day:
                        <Field
                          className="ml-1 mr-4 h-6 px-0.5 bg-white border"
                          name={`schedule.${i}.day`}
                          as="select"
                        >
                          <option value="" disabled></option>
                          {weekOrder.map((day) => (
                            <option value={day} key={day}>
                              {day}
                            </option>
                          ))}
                        </Field>
                      </label>
                      <label className="flex">
                        From:
                        <Field
                          className="ml-1 mr-4 h-6 px-0.5 bg-white border font-mono"
                          name={`schedule.${i}.startTime`}
                          as={TimeField}
                          placeholder="12:00"
                        />
                      </label>
                      <label className="flex">
                        To:
                        <Field
                          className="ml-1 mr-2 h-6 px-0.5 bg-white border font-mono"
                          name={`schedule.${i}.endTime`}
                          as={TimeField}
                        />
                      </label>
                      {form.values.schedule.length > 1 && (
                        <button
                          type="button"
                          onClick={() => fieldArray.remove(i)}
                        >
                          <img
                            className="min-w-[12px] pr-2"
                            src={removeIcon}
                            alt="Remove icon"
                          />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    className="block mx-auto my-4"
                    type="button"
                    onClick={() => fieldArray.push(initialMeetingValue)}
                  >
                    <img src={addIcon} alt="Remove icon" />
                  </button>
                </div>
              )}
            </FieldArray>
            <button className="button-primary mr-2" type="submit">
              View Events
            </button>
            <button
              className="button-secondary"
              type="button"
              onClick={() => {
                setScheduleFilter({ enabled: false, schedule: {} });
                props.onClose();
              }}
            >
              Clear Filter
            </button>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
