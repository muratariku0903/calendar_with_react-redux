import { HolidaysState } from "../stateTypes";
import { HolidaysActions } from "../actions/holidays";
import { ActionTypes } from "../actionTypes";


const initialState: HolidaysState = {
    holidays: {},
    isLoading: false,
}

const holidays = (state = initialState, action: HolidaysActions): HolidaysState => {
    switch (action.type) {
        case ActionTypes.SET_HOLIDAYS:
            return {
                ...state,
                holidays: action.payload,
                isLoading: false,
            }

        case ActionTypes.SET_HOLIDAYS_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        default:
            return state;
    }
}

export default holidays;
