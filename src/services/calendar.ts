import dayjs from "dayjs";
import { Dayjs } from 'dayjs';
import { CalendarState, ScheduleDate } from "../redux/stateTypes";

export const isSameDay = (d1: ScheduleDate, d2: ScheduleDate): boolean => {
    if (d1 && d2) {
        const format = "YYYYMMDD";
        return d1.format(format) === d2.format(format);
    }
    throw ('null date.');
};

export const isSameMonth = (m1: ScheduleDate, m2: ScheduleDate): boolean => {
    if (m1 && m2) {
        const format = "YYYYMM";
        return m1.format(format) === m2.format(format);
    }
    throw ('null date.');
};

export const isFirstDay = (day: Dayjs): boolean => day.date() === 1;

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
