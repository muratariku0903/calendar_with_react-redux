import { SchedulesState, Schedule, SchedulesKey } from '../redux/stateTypes';
import dayjs from 'dayjs';

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

export const getSchedulesByDate = (schedules: SchedulesState['monthSchedules'], key: string): Schedule[] => {
    return schedules[key] ? schedules[key] : [];
}

export const getDateSchedules = (schedules: Schedule[]): Record<string, Schedule> => {
    const dateSchedules: Record<string, Schedule> = {};
    for (const schedule of schedules) {
        const scheduleTimeStart = schedule.time.start;
        const scheduleStartHour = dayjs.unix(scheduleTimeStart).hour();
        const scheduleStartMinute = dayjs.unix(scheduleTimeStart).minute();
        const timeKey = `${scheduleStartHour}:${scheduleStartMinute}`;
        dateSchedules[timeKey] = schedule;
    }

    return dateSchedules;
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
