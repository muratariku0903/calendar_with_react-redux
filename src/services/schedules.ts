import { MonthSchedules, Schedule, ScheduleDate } from '../redux/stateTypes';
import dayjs from 'dayjs';

// これ返り値さ独自の型を定義できないかな。キーがどういうフォーマットなのかを明示的にしたい。
export const createSchedulesKey = (date: ScheduleDate): string => {
    if (date) {
        return String(dayjs(date).year()) + '_' + String(Number(dayjs(date).month()) + 1) + '_' + String(dayjs(date).date());
    }
    throw ('undefined date.');
}

export const getScheduleById = (schedules: MonthSchedules, id: number): Schedule | null => {
    for (const [key, dateSchedules] of Object.entries(schedules)) {
        for (const schedule of dateSchedules) {
            if (schedule.id === id) return schedule;
        }
    }
    return null;
}

export const updateDateSchedules = (dateSchedules: Schedule[], newSchedule: Schedule): Schedule[] => {
    for (let i = 0; i < dateSchedules.length; i++)
        if (dateSchedules[i].id === newSchedule.id)
            dateSchedules[i] = newSchedule;
    return dateSchedules;
}

export const addScheduleToDateSchedules = (key: string, monthSchedules: MonthSchedules, newSchedule: Schedule): Schedule[] => {
    return monthSchedules[key] ? monthSchedules[key].concat(newSchedule) : [newSchedule];
}
