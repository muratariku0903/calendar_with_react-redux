import { HolidaysActions, setHolidays, setHolidaysLoading, setHolidaysError } from '../holidays';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { State, HolidaysState } from '../../stateTypes';
import GoogleCalendarApi from '../../../api/GoogleCalendarApi/GoogleCalendarApi';
import { createHolidaysKey } from '../../../services/holidays';
import dayjs from 'dayjs';

type HolidaysThunkAction = ThunkAction<void, State, undefined, HolidaysActions>;


export const asyncFetchHolidays = (year: number, month: number): HolidaysThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setHolidaysLoading());
    const gapi = new GoogleCalendarApi();
    try {
        const schedulesFromGapi = await gapi.fetchHolidays(year, month);
        const holidays: HolidaysState['holidays'] = {};
        schedulesFromGapi.forEach(s => {
            const date = dayjs(s.start.date).unix();
            const name = s.summary;
            holidays[createHolidaysKey(date)] = { date, name };
        });
        console.log('Set holidays to state.');
        dispatch(setHolidays(holidays));
    } catch (e) {
        console.error('Error Setting holidays to state because:', e);
        dispatch(setHolidaysError(String(e)));
    }
}


