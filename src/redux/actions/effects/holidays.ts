import { HolidaysActions, setHolidays, setHolidaysLoading } from '../calendar/holidays';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { State, HolidaysState } from '../../stateTypes';
import GoogleCalendarApi from '../../../api/GoogleCalendarApi/GoogleCalendarApi';
import { createHolidaysKey } from '../../../services/holidays';
import { setSnackBar } from '../app/snackBar';
import dayjs from 'dayjs';

type HolidaysThunkAction = ThunkAction<void, State, undefined, HolidaysActions>;


export const asyncFetchHolidays = (year: number, month: number): HolidaysThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setHolidaysLoading(true));
    const gapi = new GoogleCalendarApi();
    try {
        const holidaysFromGapi = await gapi.fetchHolidays(year, month);
        const holidays: HolidaysState['holidays'] = {};
        holidaysFromGapi.forEach(h => {
            const date = dayjs(h.start.date).unix();
            const name = h.summary;
            const key = createHolidaysKey(date);
            holidays[key] = { date, name };
        });
        dispatch(setHolidays(holidays));
    } catch (e) {
        dispatch(setHolidaysLoading(false));
        dispatch(setSnackBar('error', '祝日の取得に失敗しました'));
        console.error(`Error Setting holidays to state because:${e}`);
    }
}
