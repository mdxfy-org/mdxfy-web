import { CalendarDate, parseDate } from "@internationalized/date";
import { DatePickerValue } from "@/components/input/date-picker";

export const parseToCalendarDate = (
  date: string | Date | DatePickerValue
): CalendarDate => {
  if (date instanceof Date) {
    return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  if (typeof date === "string") {
    const normalized = date.includes("T") ? date.split("T")[0] : date;

    if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
      return parseDate(normalized) as CalendarDate;
    }

    const [dayStr, monthStr, yearStr] = normalized.split("-");
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new CalendarDate(year, month, day);
    }

    throw new Error("Unsupported date string format");
  }

  if (
    date &&
    typeof date === "object" &&
    "year" in date &&
    "month" in date &&
    "day" in date
  ) {
    const { year, month, day } = date as { year: number; month: number; day: number };
    return new CalendarDate(year, month, day);
  }

  throw new Error("Unsupported date value");
};
