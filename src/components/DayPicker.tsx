import { FieldProps, useField } from "formik";
import { DayOfWeek, weekOrder } from "../models/meetingTypes";

export function DayPicker(props: FieldProps<Set<DayOfWeek>>["field"]) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, _, helpers] = useField<Set<DayOfWeek>>(props.name);

  const handleClick = (day: DayOfWeek) => {
    const newSet = new Set(field.value);

    if (field.value.has(day)) newSet.delete(day);
    else newSet.add(day);

    helpers.setTouched(true);
    helpers.setValue(newSet);
  };

  return (
    <div className="day-picker ml-1 mr-4 border">
      {weekOrder.map((day) => (
        <button
          className={
            "border-r w-8 py-1 last-of-type:border-r-0 " +
            (field.value.has(day) ? "bg-green" : "bg-white")
          }
          type="button"
          onClick={() => handleClick(day)}
          key={day}
        >
          {day.slice(0, 2)}
        </button>
      ))}
    </div>
  );
}
