import { State } from './types';
import { weekCnt } from '../constants';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { getMonth } from '../services/calendar';


export const getCalendarDates = (store: State): Dayjs[] => {
    const { year, month } = store.calendar;
    const firstDay = getMonth(year, month + 1);
    const prevMonthDateCnt = firstDay.day();
    const currentMonthDateCnt = firstDay.endOf('month').date();
    const nextMonthDateCnt = 6 - firstDay.endOf('month').day();
    const totalCellCnt = prevMonthDateCnt + currentMonthDateCnt + nextMonthDateCnt;

    return Array(totalCellCnt).fill(0).map((_, i) => firstDay.add(i - prevMonthDateCnt, "day"));
}


// 日にちから曜日を取得する関数も用意したほうが良いかも
