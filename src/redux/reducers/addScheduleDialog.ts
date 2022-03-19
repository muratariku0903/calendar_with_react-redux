import { AddScheduleDialogState, initialDialogForm } from "../stateTypes";
import { ActionTypes } from "../actionTypes";
import { AddScheduleDialogActions } from "../actions/addScheduleDialog";


const initialState: AddScheduleDialogState = {
    schedule: initialDialogForm,
    isStartEdit: false,
    isOpenDialog: false,
}

const addScheduleDialog = (state = initialState, action: AddScheduleDialogActions): AddScheduleDialogState => {
    switch (action.type) {
        case ActionTypes.SET_ADD_SCHEDULE_DIALOG:
            return { ...state, schedule: { ...state.schedule, ...action.payload } }

        case ActionTypes.START_EDIT_ADD_SCHEDULE_DIALOG:
            return { ...state, isStartEdit: true };

        case ActionTypes.OPEN_ADD_SCHEDULE_DIALOG:
            return { ...state, isOpenDialog: true }

        case ActionTypes.CLOSE_ADD_SCHEDULE_DIALOG:
            return initialState;

        default:
            return state;
    }
}

export default addScheduleDialog;
