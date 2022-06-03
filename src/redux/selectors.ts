import { State, Schedule, Holiday } from './stateTypes';
import { getMonth, getTotalCalendarCellCnt, getDate } from '../services/calendar';
import { createSchedulesKey } from '../services/schedules';
import dayjs, { Dayjs } from 'dayjs';


export type CalendarDate = {
    date: Dayjs;
    holiday: Holiday | null,
    dateSchedules: Schedule[],
}

export const getCalendarDates = (store: State): CalendarDate[] => {
    const { year, month } = store.calendar;
    const holidays = store.holidays.holidays;
    const schedules = store.schedules.monthSchedules;
    const firstDay = getMonth(year, month);
    const prevMonthDateCnt = firstDay.day();
    const totalCellCnt = getTotalCalendarCellCnt(firstDay);
    const dates: CalendarDate[] = [];
    for (let i = 0; i < totalCellCnt; i++) {
        const date = firstDay.add(i - prevMonthDateCnt, "day");
        const dateKey = createSchedulesKey(date.unix());
        dates.push({
            date: date,
            dateSchedules: dateKey in schedules ? schedules[dateKey] : [],
            holiday: dateKey in holidays ? holidays[dateKey] : null,
        });
    }

    return dates;
}
