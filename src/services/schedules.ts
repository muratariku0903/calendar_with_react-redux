import { MonthSchedules, Schedule } from '../redux/stateTypes';
import dayjs from 'dayjs';

// これ返り値さ独自の型を定義できないかな。キーがどういうフォーマットなのかを明示的にしたい。
export const createSchedulesKey = (stamp: Schedule['date']): string => {
    const date = dayjs.unix(stamp);
    return String(date.year()) + '_' + String(Number(date.month()) + 1) + '_' + String(date.date());
}

export const getScheduleById = (schedules: MonthSchedules, id: number): Schedule => {
    for (const [key, dateSchedules] of Object.entries(schedules)) {
        for (const schedule of dateSchedules) {
            if (schedule.id === id) return schedule;
        }
    }
    throw ('Error adding prevSchedule by id');
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
