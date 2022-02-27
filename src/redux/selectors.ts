import { State } from './stateTypes';
import { Dayjs } from 'dayjs';
import { getMonth, getTotalCalendarCellCnt } from '../services/calendar';
import { Schedule } from '../redux/stateTypes';
import { createSchedulesKey } from '../services/schedules';


export type Date = {
    date: Dayjs;
    dateSchedules: Schedule[],
}

export const getCalendarDates = (store: State): Date[] => {
    const { year, month } = store.calendar;
    const schedules = store.schedules.dateSchedules;
    const firstDay = getMonth(year, month);
    const prevMonthDateCnt = firstDay.day();
    const totalCellCnt = getTotalCalendarCellCnt(firstDay);
    const dates: Date[] = [];
    for (let i = 0; i < totalCellCnt; i++) {
        const date = firstDay.add(i - prevMonthDateCnt, "day");
        const date_key = createSchedulesKey(date);
        dates.push({
            date: date,
            dateSchedules: date_key in schedules ? schedules[date_key] : [],
        });
    }
    return dates;
}


// 日にちから曜日を取得する関数も用意したほうが良いかも
