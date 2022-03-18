import { Holiday } from '../redux/stateTypes';
import dayjs from 'dayjs';

export const createHolidaysKey = (date: Holiday['date']): string => {
    const d = dayjs.unix(date);
    return String(d.year()) + '_' + String(Number(d.month()) + 1) + '_' + String(d.date());
}
