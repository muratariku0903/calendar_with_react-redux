import dayjs from "dayjs";
import { Dayjs } from 'dayjs';
import { CalendarState } from "../redux/types";

export const isSameDay = (d1: Dayjs, d2: Dayjs): boolean => {
    const format = "YYYYMMDD";
    return d1.format(format) === d2.format(format);
};

export const isSameMonth = (m1: Dayjs, m2: Dayjs): boolean => {
    const format = "YYYYMM";
    return m1.format(format) === m2.format(format);
};

export const isFirstDay = (day: Dayjs): boolean => day.date() === 1;

export const getMonth = (year: number, month: number): Dayjs => {
    return dayjs(`${year}-${month}`);
}

export const getYearMonthFromDayjsObj = (obj: Dayjs): CalendarState => {
    return {
        year: obj.year(),
        month: obj.month(),
    }
}
