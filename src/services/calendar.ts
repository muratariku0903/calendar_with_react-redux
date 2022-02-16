import dayjs from "dayjs";
import { Dayjs } from 'dayjs';

export const isSameDay = (d1: Dayjs, d2: Dayjs): boolean => {
    const format = "YYYYMMDD";
    return d1.format(format) === d2.format(format);
};

export const isSameMonth = (m1: Dayjs, m2: Dayjs): boolean => {
    const format = "YYYYMM";
    return m1.format(format) === m2.format(format);
};

export const isFirstDay = (day: Dayjs): boolean => day.date() === 1;
