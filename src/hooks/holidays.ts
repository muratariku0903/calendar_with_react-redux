import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { State, Holiday } from "../redux/stateTypes";
import { createHolidaysKey } from '../services/holidays';
import dayjs from 'dayjs';

export const useGetWeekHolidays = (year: number, month: number, firstDateOfWeek: number): (Holiday | null)[] => {
    const [weekHolidays, setWeekHolidays] = useState<(Holiday | null)[]>([]);
    const holidays = useSelector((state: State) => state.holidays.holidays);

    useEffect(() => {
        const tmpHolidays: (Holiday | null)[] = [];
        const d = dayjs(`${year}-${month}-${firstDateOfWeek}`);
        for (let i = 0, date = d; i < 7; i++, date = d.add(i, 'd')) {
            const key = createHolidaysKey(date.unix());
            tmpHolidays.push(holidays[key]);
        }
        setWeekHolidays(tmpHolidays);
    }, [year, month, firstDateOfWeek]);

    return weekHolidays;
}
