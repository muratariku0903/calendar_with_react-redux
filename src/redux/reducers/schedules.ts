import { Schedule, SchedulesState } from "../stateTypes";
import { SchedulesActions } from "../actions/schedules";
import { ActionTypes } from "../actionTypes";

const initialState: SchedulesState = {
    schedules: {},
    isLoading: false
}

const schedules = (state = initialState, action: SchedulesActions) => {
    switch (action.type) {
        case ActionTypes.ADD_SCHEDULES:
            console.log(state.schedules);
            let newSchedules: Schedule[];
            let prevSchedules = state.schedules[action.payload.key];
            if (prevSchedules) {
                newSchedules = prevSchedules.concat(action.payload.schedule);
            } else {
                newSchedules = [action.payload.schedule];
            }
            return {
                ...state,
                schedules: {
                    ...state.schedules,
                    [action.payload.key]: newSchedules,
                },
            }
        default:
            return state;
    }
}

export default schedules;
