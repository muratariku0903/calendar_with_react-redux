import { HolidaysActions, setHolidays, setHolidaysLoading } from '../holidays';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { State, HolidaysState } from '../../stateTypes';
import GoogleCalendarApi from '../../../api/GoogleCalendarApi/GoogleCalendarApi';
import { createHolidaysKey } from '../../../services/holidays';
import dayjs from 'dayjs';

type HolidaysThunkAction = ThunkAction<void, State, undefined, HolidaysActions>;


export const asyncFetchHolidays = (year: number, month: number): HolidaysThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setHolidaysLoading());
    await GoogleCalendarApi.fetchHolidays(year, month)
        .then(items => {
            const holidays: HolidaysState['holidays'] = {};
            items.forEach(item => {
                const date = dayjs(item.start.date).unix();
                const name = item.summary;
                holidays[createHolidaysKey(date)] = { date, name };
            });
            console.log(holidays);
            console.log('set holidays from google calendar api.');
            dispatch(setHolidays(holidays));
        }).catch(err => {
            console.log('Error fetching docs', err);
        });
}


