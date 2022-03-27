import { ShowScheduleDialogState, initialDialogForm } from "../../stateTypes";
import { ActionTypes } from "../../actionTypes";
import { ShowScheduleDialogActions } from "../../actions/calendar/showScheduleDialog";

const initialState: ShowScheduleDialogState = {
    schedule: {
        id: -1,
        ...initialDialogForm,
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
