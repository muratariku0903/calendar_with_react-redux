import { useState, useEffect } from 'react';
import { Schedule, SchedulesState } from '../redux/stateTypes';
import { createSchedulesKey, getSchedulesByDate } from '../services/schedules';

export const useGetDateSchedules = (deps: any[] = [], schedules: SchedulesState['monthSchedules'], dateStamp: number): Schedule[] => {
    const [dateSchedules, setDateSchedules] = useState<Schedule[]>([]);
    
    useEffect(() => {
        const key = createSchedulesKey(dateStamp);
        const dateSchedules = getSchedulesByDate(schedules, key);
        setDateSchedules(dateSchedules);
    }, deps);

    return dateSchedules;
}
