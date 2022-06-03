import { useMemo } from "react";
// import { getDatesOfWeek, getFirstDateOfWeekTimeStamp } from "../services/calendar";
import dayjs, { Dayjs } from 'dayjs';

export const useGetWeekDates = (firstDateOfWeekTimeStamp: number): Dayjs[] => {
    return useMemo(() => {
        const firstDateOfWeek = dayjs.unix(firstDateOfWeekTimeStamp);
        const dates: Dayjs[] = [];
        for (let i = 0; i < 7; i++) dates.push(firstDateOfWeek.add(i, 'd'));

        return dates;
    }, [firstDateOfWeekTimeStamp]);
}
