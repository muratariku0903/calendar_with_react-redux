import { ShowScheduleDialogActions } from "../actions/showScheduleDialog";
import { ActionTypes } from "../actionTypes";
import { ShowScheduleDialogState } from "../stateTypes";

const initialState: ShowScheduleDialogState = {
    schedule: {
        title: '',
        date: null,
        description: '',
        location: '',
    },
    isOpenDialog: false,
}

const showScheduleDialog = (state = initialState, action: ShowScheduleDialogActions) => {
    switch (action.type) {
        case ActionTypes.SET_SHOW_SCHEDULE_DIALOG:
            return { ...state, schedule: action.payload }
        case ActionTypes.OPEN_SHOW_SCHEDULE_DIALOG:
            return { ...state, isOpenDialog: true }
        case ActionTypes.CLOSE_SHOW_SCHEDULE_DIALOG:
            return { ...state, isOpenDialog: false }
        default:
            return state;
    }
}

export default showScheduleDialog;
