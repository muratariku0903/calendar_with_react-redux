import dayjs from "dayjs";
import { Dayjs } from 'dayjs';

export const isSameTime = (stamp1: number, stamp2: number): boolean => {
    const format = "HHmm";
    return dayjs.unix(stamp1).format(format) === dayjs.unix(stamp2).format(format);
}

export const isSameDay = (stamp1: number, stamp2: number): boolean => {
    const format = "YYYYMMDD";
    return dayjs.unix(stamp1).format(format) === dayjs.unix(stamp2).format(format);
};

export const isSameMonth = (m1: number, m2: number): boolean => {
    const format = "YYYYMM";
    return dayjs.unix(m1).format(format) === dayjs.unix(m2).format(format);
};

export const isFirstDay = (day: Dayjs): boolean => {
    return day.date() === 1;
}

// これは何をするの？
export const getCurrHourAndCurrMinute = (): { hour: number, minute: number } => {
    const currTime = roundMinutes(dayjs().unix());
    const hour = dayjs.unix(currTime).hour();
    const minute = dayjs.unix(currTime).minute();

    return { hour, minute };
}

export const roundMinutes = (stamp: number, unit: number = 15): number => {
    return Math.ceil(stamp / 60 / unit) * unit * 60;
}

export const getMonth = (year: number, month: number): Dayjs => {
    const date = dayjs(`${year}-${month}`);
    if (date.isValid() && validateYearMonth(year, month)) return date;
    throw (`Invalid date from year(${year}) and month(${month}).`);
}

export const getPrevMonth = (year: number, month: number): Dayjs => {
    if (month === 1) {
        year--;
        month = 12;
    } else {
        month--;
    }

    return getMonth(year, month);
}

export const getNextMonth = (year: number, month: number): Dayjs => {
    if (month === 12) {
        year++;
        month = 1;
    } else {
        month++;
    }

    return getMonth(year, month);
}

export const getDate = (year: number, month: number, date: number) => {
    const dateDate = dayjs(`${year}-${month}-${date}`);
    if (dateDate.isValid() && validateYearMonthDate(year, month, date)) return dateDate;
    throw (`Invalid date from year(${year}) and month(${month}) and date(${date}).`);
}

export const getDateCntOfMonth = (year: number, month: number): number => {
    return getMonth(year, month).endOf('month').date();
}

export const getDatesOfWeek = (year: number, month: number, firstDateOfWeek: number): Dayjs[] => {
    let firstDate = getDate(year, month, firstDateOfWeek);
    const dates: Dayjs[] = [];
    for (let i = 0; i < 7; i++) dates.push(firstDate.add(i, 'd'));

    return dates;
}

export const getTotalCalendarCellCnt = (date: Dayjs): number => {
    const prevMonthDateCnt = date.day();
    const currentMonthDateCnt = date.endOf('month').date();
    const nextMonthDateCnt = 6 - date.endOf('month').day();

    return prevMonthDateCnt + currentMonthDateCnt + nextMonthDateCnt;
}

export const getDateStrFromTimeStamp = (timestamp: number): string => {
    const d = dayjs.unix(timestamp);

    return `${d.year()}-${d.month() + 1}-${d.date()}`;
}

export const getHourMinuteStrFromTimeStamp = (timestamp: number) => {
    const d = dayjs.unix(timestamp);

    return `${d.hour()}:${d.minute()}`;
}

const validateYearMonthDate = (year: number, month: number, date: number): boolean => {
    return validateYear(year) && validateMonth(month) && validateDate(date);
}

const validateYearMonth = (year: number, month: number): boolean => {
    return validateYear(year) && validateMonth(month);
}

const validateYear = (year: number): boolean => {
    return String(year).length === 4;
}

const validateMonth = (month: number): boolean => {
    return 1 <= month && month <= 12;
}

const validateDate = (date: number): boolean => {
    return 1 <= date && date <= 31;
}
