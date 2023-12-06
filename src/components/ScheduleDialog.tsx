import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { defaultTo, isEmpty, noop } from "lodash-es";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import addIcon from "../images/add.svg";
import removeIcon from "../images/remove.svg";
import { DayOfWeek, MeetingSchedule, weekOrder } from "../models/meetingTypes";
import { DisableableFilter, ReactState } from "../models/misc";
import { DayPicker } from "./DayPicker";
import { Dialog, DialogProps } from "./Dialog";

export const initalScheduleFilterValue = {
  enabled: true,
  filter: {}
};
export const ScheduleFilter = createContext<
  ReactState<DisableableFilter<MeetingSchedule>>
>([initalScheduleFilterValue, noop]);

export type ScheduleDialogProps = Omit<DialogProps, "className" | "children">;

const scheduleFormSchema = Yup.object().shape({
  enabled: Yup.boolean().defined(),
  schedule: Yup.array()
    .of(
      Yup.object().shape({
        days: Yup.mixed<Set<DayOfWeek>>()
          .required()
          .test(
            "check-days",
            "Choose at least one day",
            (value) => value.size > 0
          ),
        startTime: Yup.string().required("Start time is required"),
        endTime: Yup.string()
          .required("End time is required")
          .test(
            "end-after-start",
            "Must end after it begins",
            (value, testContext) => testContext.parent.startTime <= value
          )
      })
    )
    .required()
});
type ScheduleFormValues = Yup.InferType<typeof scheduleFormSchema>;

const initialMeetingValue: ScheduleFormValues["schedule"][number] = {
  days: new Set(),
  startTime: "",
  endTime: ""
};

function contextToFormValues(
  context: DisableableFilter<MeetingSchedule>
): ScheduleFormValues {
  const schedule: ScheduleFormValues["schedule"] = [];
  // holds concatenation of startTimes and endTimes
  // to check and combine identical intervals
  const intervals = new Set<string>();

  for (const day of weekOrder) {
    for (const meeting of defaultTo(context.filter[day], [])) {
      const interval = meeting.startTime + meeting.endTime;

      if (intervals.has(interval)) {
        schedule
          .find(
            (val) =>
              val.startTime === meeting.startTime &&
              val.endTime === meeting.endTime
          )
          ?.days.add(day);
      } else {
        schedule.push({
          days: new Set([day]),
          startTime: meeting.startTime,
          endTime: meeting.endTime
        });
        intervals.add(interval);
      }
    }
  }

  // add blank meeting if schedule is empty
  if (schedule.length === 0) schedule.push(initialMeetingValue);

  return { enabled: context.enabled, schedule };
}

function formValuesToContext(
  values: ScheduleFormValues
): DisableableFilter<MeetingSchedule> {
  const schedule: MeetingSchedule = {};

  for (const meeting of values.schedule) {
    meeting.days.forEach((day) => {
      if (!(day in schedule)) schedule[day] = [];
      schedule[day]?.push({
        name: "",
        clubName: "",
        startTime: meeting.startTime,
        endTime: meeting.endTime
      });
    });
  }

  return { enabled: values.enabled, filter: schedule };
}

export function ScheduleDialog(props: ScheduleDialogProps) {
  const [scheduleFilter, setScheduleFilter] = useContext(ScheduleFilter);
  const navigate = useNavigate();

  const handleSubmit = (values: ScheduleFormValues) => {
    setScheduleFilter(formValuesToContext(values));
    navigate("/calendar");
    props.onClose();
  };

  return (
    <Dialog className="schedule-dialog p-2 bg-gray border-2" {...props}>
      <Formik
        initialValues={contextToFormValues(scheduleFilter)}
        validationSchema={scheduleFormSchema}
        onSubmit={handleSubmit}
      >
        {(form) => (
          <Form>
            <h3>Schedule</h3>
            <p className="mb-1">Enter times you are available</p>
            <FieldArray name="schedule">
              {(fieldArray) => (
                <div
                  className={
                    "min-h-[16rem]" + (form.values.enabled ? "" : " opacity-30")
                  }
                >
                  {form.values.schedule.map((val, i) => (
                    <div key={i}>
                      <div className="flex whitespace-nowrap my-1">
                        <label className="flex items-center">
                          Days:
                          <Field
                            className="ml-1 mr-4 h-6 px-0.5 bg-white border"
                            name={`schedule.${i}.days`}
                            as={DayPicker}
                            disabled={!form.values.enabled}
                          />
                        </label>
                        <label className="flex items-center">
                          Start:
                          <Field
                            className="ml-1 mr-4 h-6 px-0.5 bg-white border font-mono"
                            name={`schedule.${i}.startTime`}
                            type="time"
                            disabled={!form.values.enabled}
                          />
                        </label>
                        <label className="flex items-center">
                          End:
                          <Field
                            className="ml-1 mr-2 h-6 px-0.5 bg-white border font-mono"
                            name={`schedule.${i}.endTime`}
                            type="time"
                            disabled={!form.values.enabled}
                          />
                        </label>
                        <button
                          className="pr-2.5"
                          type="button"
                          onClick={() => fieldArray.remove(i)}
                          disabled={!form.values.enabled}
                        >
                          <img
                            className="min-w-[12px] min-h-[12px]"
                            src={removeIcon}
                            alt="Remove icon"
                          />
                        </button>
                      </div>
                      <div className="errors text-red pl-4 text-xs leading-tight">
                        <ErrorMessage
                          name={`schedule.${i}.days`}
                          component="p"
                        />
                        <ErrorMessage
                          name={`schedule.${i}.startTime`}
                          component="p"
                        />
                        <ErrorMessage
                          name={`schedule.${i}.endTime`}
                          component="p"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    className="block mx-auto my-4"
                    type="button"
                    onClick={() => {
                      const lastScheduleIndex = form.values.schedule.length - 1;
                      // set last entry to be touched to trigger validation
                      form.setFieldTouched(
                        `schedule.${lastScheduleIndex}.days`
                      );
                      form.setFieldTouched(
                        `schedule.${lastScheduleIndex}.startTime`
                      );
                      form.setFieldTouched(
                        `schedule.${lastScheduleIndex}.endTime`
                      );
                      // prevent new entry from being added if invalid
                      form.validateForm().then((errors) => {
                        if (isEmpty(errors))
                          fieldArray.push(initialMeetingValue);
                      });
                    }}
                    disabled={!form.values.enabled}
                  >
                    <img src={addIcon} alt="Add icon" />
                  </button>
                </div>
              )}
            </FieldArray>
            <button
              className="button-primary mr-2"
              type="submit"
              onClick={() => {
                // messy but allows us to override validation to disable filter
                form.validateForm().then((errors) => {
                  if (!form.values.enabled && !isEmpty(errors))
                    handleSubmit(form.values);
                });
              }}
            >
              View Events
            </button>
            {/* <button
              className="button-secondary"
              type="button"
              onClick={() => {
                form.setValues(contextToFormValues(initalScheduleFilterValue));
                setScheduleFilter(initalScheduleFilterValue);
              }}
            >
              Clear Filter
            </button> */}
            <label>
              <Field className="mx-1" type="checkbox" name="enabled" />
              Enable Filter
            </label>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
