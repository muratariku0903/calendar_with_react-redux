import { State, Schedule, User, Holiday } from './stateTypes';
import { DialogTypes } from "./constants";
import { getMonth, getTotalCalendarCellCnt } from '../services/calendar';
import { createSchedulesKey } from '../services/schedules';
import dayjs, { Dayjs } from 'dayjs';


export type CalendarDate = {
    date: Dayjs;
    holiday: Holiday | null,
    dateSchedules: Schedule[],
}

export const getCalendarDates = (store: State): CalendarDate[] => {
    const { year, month } = store.calendar;
    const holidays = store.holidays.holidays;
    const schedules = store.schedules.monthSchedules;
    const firstDay = getMonth(year, month);
    const prevMonthDateCnt = firstDay.day();
    const totalCellCnt = getTotalCalendarCellCnt(firstDay);
    const dates: CalendarDate[] = [];
    for (let i = 0; i < totalCellCnt; i++) {
        const date = firstDay.add(i - prevMonthDateCnt, "day");
        const dateKey = createSchedulesKey(date.unix());
        dates.push({
            date: date,
            dateSchedules: dateKey in schedules ? schedules[dateKey] : [],
            holiday: dateKey in holidays ? holidays[dateKey] : null,
        });
    }

    return dates;
}


export const getCalendarWeekDates = (state: State): CalendarDate[] => {
    const { firstDateOfWeek } = state.calendar;
    const holidays = state.holidays.holidays;
    const schedules = state.schedules.monthSchedules;
    const firstDay = dayjs.unix(firstDateOfWeek);
    const dates: CalendarDate[] = [];
    for (let i = 0; i < 7; i++) {
        const date = firstDay.add(i, "day");
        const dateKey = createSchedulesKey(date.unix());
        dates.push({
            date: date,
            dateSchedules: dateKey in schedules ? schedules[dateKey] : [],
            holiday: dateKey in holidays ? holidays[dateKey] : null,
        });
    }

    return dates;
}

type DialogType = typeof DialogTypes[keyof typeof DialogTypes];
export const getDialogForm = (state: State, dialogType: DialogType): Omit<Schedule, 'id'> | User => {
    switch (dialogType) {
        case 'ADD_SCHEDULE':
            return state.addScheduleDialog.schedule;
        case 'UPDATE_SCHEDULE':
            return state.updateScheduleDialog.schedule;
        case 'UPDATE_USER':
            return state.updateUserDialog.user;
    }
}
