import { useMemo } from "react";
import dayjs, { Dayjs } from 'dayjs';

export const useGetWeekDates = (firstDateOfWeekTimeStamp: number): Dayjs[] => {
    return useMemo(() => {
        const firstDateOfWeek = dayjs.unix(firstDateOfWeekTimeStamp);
        const dates: Dayjs[] = [];
        for (let i = 0; i < 7; i++) dates.push(firstDateOfWeek.add(i, 'd'));

        return dates;
    }, [firstDateOfWeekTimeStamp]);
}
