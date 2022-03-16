import { Dayjs } from 'dayjs';

export const createHolidaysKey = (date: Dayjs | null): string => {
    if (date) {
        return String(date.year()) + '_' + String(Number(date.month()) + 1) + '_' + String(date.date());
    }
    throw ('undefined date.');
}
