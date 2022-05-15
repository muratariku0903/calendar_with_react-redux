import { useMemo } from "react";
import { getDatesOfWeek } from "../services/calendar";
import { Dayjs } from 'dayjs';

export const useGetWeekDates = (year: number, month: number, firstDateOfWeek: number): Dayjs[] => {
    return useMemo(() => getDatesOfWeek(year, month, firstDateOfWeek), [year, month, firstDateOfWeek]);
}
