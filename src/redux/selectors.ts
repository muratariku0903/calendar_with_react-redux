import { State, Schedule, Holiday } from './stateTypes';
import { Dayjs } from 'dayjs';
import { getMonth, getTotalCalendarCellCnt } from '../services/calendar';
import { createSchedulesKey } from '../services/schedules';


export type Date = {
    date: Dayjs;
    dateSchedules: Schedule[],
    holiday: Holiday | null,
}

export const getCalendarDates = (store: State): Date[] => {
    const { year, month } = store.calendar;
    const holidays = store.holidays.holidays;
    const schedules = store.schedules.dateSchedules;
    const firstDay = getMonth(year, month);
    const prevMonthDateCnt = firstDay.day();
    const totalCellCnt = getTotalCalendarCellCnt(firstDay);
    const dates: Date[] = [];
    for (let i = 0; i < totalCellCnt; i++) {
        const date = firstDay.add(i - prevMonthDateCnt, "day");
        const dateKey = createSchedulesKey(date);
        dates.push({
            date: date,
            dateSchedules: dateKey in schedules ? schedules[dateKey] : [],
            holiday: dateKey in holidays ? holidays[dateKey] : null,
        });
    }

    return dates;
}


// 日にちから曜日を取得する関数も用意したほうが良いかも
