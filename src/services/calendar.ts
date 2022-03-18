import dayjs from "dayjs";
import { Dayjs } from 'dayjs';

export const isSameDay = (stamp1: number, stamp2: number): boolean => {
    const format = "YYYYMMDD";
    return dayjs.unix(stamp1).format(format) === dayjs.unix(stamp2).format(format);
};

export const isSameMonth = (m1: number, m2: number): boolean => {
    const format = "YYYYMM";
    return dayjs.unix(m1).format(format) === dayjs.unix(m2).format(format);
};

export const isFirstDay = (day: Dayjs): boolean => day.date() === 1;

export const getMonth = (year: number, month: number): Dayjs => {
    return dayjs(`${year}-${month}`);
}

export const getDateCntOfMonth = (year: number, month: number): number => {
    return getMonth(year, month).endOf('month').date();
}

export const getTotalCalendarCellCnt = (date: Dayjs): number => {
    const prevMonthDateCnt = date.day();
    const currentMonthDateCnt = date.endOf('month').date();
    const nextMonthDateCnt = 6 - date.endOf('month').day();
    return prevMonthDateCnt + currentMonthDateCnt + nextMonthDateCnt;
}
