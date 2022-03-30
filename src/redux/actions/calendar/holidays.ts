import { ActionTypes } from '../../actionTypes';
import { HolidaysState } from '../../stateTypes';


type SetHolidaysAction = {
    type: ActionTypes.SET_HOLIDAYS;
    payload: HolidaysState['holidays'];
}

export const setHolidays = (holidays: HolidaysState['holidays']): SetHolidaysAction => {
    return {
        type: ActionTypes.SET_HOLIDAYS,
        payload: holidays,
    }
}

type SetHolidaysLoading = {
    type: ActionTypes.SET_HOLIDAYS_LOADING;
    payload: HolidaysState['isLoading'];
}

export const setHolidaysLoading = (isLoading: HolidaysState['isLoading']): SetHolidaysLoading => {
    return {
        type: ActionTypes.SET_HOLIDAYS_LOADING,
        payload: isLoading,
    }
}

export type HolidaysActions = SetHolidaysAction | SetHolidaysLoading;
