import { Schedule, SchedulesState } from "../stateTypes";
import { SchedulesActions } from "../actions/schedules";
import { ActionTypes } from "../actionTypes";

const initialState: SchedulesState = {
    dateSchedules: {},
    isLoading: false
}

const schedules = (state = initialState, action: SchedulesActions): SchedulesState => {
    switch (action.type) {
        case ActionTypes.ADD_SCHEDULES:
            let newSchedules: Schedule[];
            let prevSchedules = state.dateSchedules[action.payload.key];
            if (prevSchedules) {
                newSchedules = prevSchedules.concat(action.payload.schedule);
            } else {
                newSchedules = [action.payload.schedule];
            }
            return {
                ...state,
                dateSchedules: {
                    ...state.dateSchedules,
                    [action.payload.key]: newSchedules,
                },
            }
        case ActionTypes.FETCH_SCHEDULES:
            return {
                ...state,
                dateSchedules: action.payload,
                isLoading: false,
            }

        case ActionTypes.SET_SCHEDULES_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        default:
            return state;
    }
}

export default schedules;
