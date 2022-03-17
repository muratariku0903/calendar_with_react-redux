import dayjs from "dayjs";
import { Dayjs } from 'dayjs';
import { CalendarState, ScheduleDate } from "../redux/stateTypes";

export const isSameDay = (d1: ScheduleDate, d2: ScheduleDate): boolean => {
    if (d1 && d2) {
        const format = "YYYYMMDD";
        return dayjs(d1).format(format) === dayjs(d2).format(format);
    }
    throw ('null date.');
};

export const isSameMonth = (m1: ScheduleDate, m2: ScheduleDate): boolean => {
    if (m1 && m2) {
        const format = "YYYYMM";
        return dayjs(m1).format(format) === dayjs(m2).format(format);
    }
    throw ('null date.');
};

export const isFirstDay = (day: Dayjs): boolean => day.date() === 1;

export const isSaturday = (date: ScheduleDate): boolean => {
    if (date) return dayjs(date).day() === 6;
    throw ('null date.');
}

export const isSunday = (date: ScheduleDate): boolean => {
    if (date) return dayjs(date).day() === 0;
    throw ('null date.');
}

export const getMonth = (year: number, month: number): Dayjs => {
    return dayjs(`${year}-${month}`);
}

export const getDateCntOfMonth = (year: number, month: number): number => {
    return getMonth(year, month).endOf('month').date();
}

export const getTotalCalendarCellCnt = (obj: Dayjs): number => {
    const prevMonthDateCnt = obj.day();
    const currentMonthDateCnt = obj.endOf('month').date();
    const nextMonthDateCnt = 6 - obj.endOf('month').day();
    return prevMonthDateCnt + currentMonthDateCnt + nextMonthDateCnt;
}

export const getYearMonthFromDayjsObj = (obj: Dayjs): CalendarState => {
    return {
        year: obj.year(),
        month: obj.month(),
    }
}
