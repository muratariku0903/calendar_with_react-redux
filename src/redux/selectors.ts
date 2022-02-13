import { State } from './types';
import { weekCnt } from '../constants';
import dayjs from 'dayjs';

dayjs.locale('ja');

export type CalendarDate = number | null;

export const getCalendarDates = (store: State): CalendarDate[] => {
    const { year, month } = store.calendar;
    const prevBlankCnt = new Date(year, month, 1).getDay();
    const nextBlankCnt = weekCnt - new Date(year, month + 1, 0).getDay() - 1;
    const lastDate = new Date(year, month + 1, 0).getDate();
    const totalCellCnt = prevBlankCnt + lastDate + nextBlankCnt;
    const calendarDates: CalendarDate[][] = [];
    let dates: CalendarDate[] = [];
    for (let cell = 0, date = -prevBlankCnt + 1; cell < totalCellCnt; cell++, date++) {
        dates.push(1 <= date && date <= lastDate ? date : null);
        // if (cell !== 0 && (cell + 1) % 7 === 0) {
        //     console.log(dates);
        //     calendarDates.push(dates);
        //     dates = [];
        // }
    }

    return dates;
}

// 日にちから曜日を取得する関数も用意したほうが良いかも
