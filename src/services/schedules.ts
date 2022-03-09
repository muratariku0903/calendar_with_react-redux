import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { MonthSchedules, Schedule } from '../redux/stateTypes';

// これ返り値さ独自の型を定義できないかな。キーがどういうフォーマットなのかを明示的にしたい。
export const createSchedulesKey = (dateObj: MaterialUiPickersDate): string => {
    return String(dateObj?.year()) + '_' + String(Number(dateObj?.month()) + 1) + '_' + String(dateObj?.date());
}

export const getScheduleById = (schedules: MonthSchedules, id: number): Schedule | null => {
    for (const [key, dateSchedules] of Object.entries(schedules)) {
        for (const schedule of dateSchedules) {
            if (schedule.id === id) return schedule;
        }
    }
    return null;
}

