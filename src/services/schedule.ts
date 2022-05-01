import { Schedule } from "../redux/stateTypes"
import dayjs from 'dayjs';

export const getScheduleTimeMergedDate = (date: Schedule['date'], time: Schedule['time']): Schedule['time'] => {
    const { start, end } = time;
    const startHour = dayjs.unix(start).hour();
    const startMinute = dayjs.unix(start).minute();
    const endHour = dayjs.unix(end).hour();
    const endMinute = dayjs.unix(end).minute();
    const newScheduleTimeStart = dayjs.unix(date).hour(startHour).minute(startMinute).unix();
    const newScheduleTimeEnd = dayjs.unix(date).hour(endHour).minute(endMinute).unix();
    return { start: newScheduleTimeStart, end: newScheduleTimeEnd };
}

