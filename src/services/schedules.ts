import { SchedulesState, Schedule, SchedulesKey } from '../redux/stateTypes';
import dayjs from 'dayjs';

// これ返り値さ独自の型を定義できないかな。キーがどういうフォーマットなのかを明示的にしたい。
export const createSchedulesKey = (stamp: Schedule['date']): SchedulesKey => {
    const date = dayjs.unix(stamp);
    return `${date.year()}_${date.month() + 1}_${date.date()}`;
}

export const getScheduleById = (schedules: SchedulesState['monthSchedules'], id: number): Schedule => {
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

export const addScheduleToDateSchedules = (key: SchedulesKey, monthSchedules: SchedulesState['monthSchedules'], newSchedule: Schedule): Schedule[] => {
    return monthSchedules[key] ? monthSchedules[key].concat(newSchedule) : [newSchedule];
}
