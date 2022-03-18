import { ActionTypes } from '../actionTypes';
import { HolidaysState } from '../stateTypes';


type SetHolidaysAction = {
    type: ActionTypes.SET_HOLIDAYS;
    payload: HolidaysState['holidays'];
}

// fetchというよりsetの方がしっくりくるかも
export const setHolidays = (holidays: HolidaysState['holidays']): SetHolidaysAction => {
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
