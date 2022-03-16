import { ActionTypes } from '../actionTypes';
import { Holidays } from '../stateTypes';


type SetHolidaysAction = {
    type: ActionTypes.SET_HOLIDAYS;
    payload: Holidays;
}

// fetchというよりsetの方がしっくりくるかも
export const setHolidays = (holidays: Holidays): SetHolidaysAction => {
    console.log('set holidays from google calendar api.');
    return {
        type: ActionTypes.SET_HOLIDAYS,
        payload: holidays,
    }
}

type SetHolidaysLoading = {
    type: ActionTypes.SET_HOLIDAYS_LOADING;
}

export const setHolidaysLoading = (): SetHolidaysLoading => {
    return {
        type: ActionTypes.SET_HOLIDAYS_LOADING
    }
}

export type HolidaysActions = SetHolidaysAction | SetHolidaysLoading;
