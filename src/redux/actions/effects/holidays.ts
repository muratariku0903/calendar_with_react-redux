import { HolidaysActions, setHolidays, setHolidaysLoading, setHolidaysError } from '../calendar/holidays';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { State, HolidaysState } from '../../stateTypes';
import GoogleCalendarApi from '../../../api/GoogleCalendarApi/GoogleCalendarApi';
import { createHolidaysKey } from '../../../services/holidays';
import { setSnackBar } from '../app/snackBar';
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
        dispatch(setHolidays(holidays));
    } catch (e) {
        dispatch(setSnackBar('error', '祝日の取得に失敗しました'));
        console.error(`Error Setting holidays to state because:${e}`);
    }
}


