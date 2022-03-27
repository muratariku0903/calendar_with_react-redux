import { AddScheduleDialogState, initialDialogForm } from "../../stateTypes";
import { ActionTypes } from "../../actionTypes";
import { AddScheduleDialogActions } from "../../actions/calendar/addScheduleDialog";


const initialState: AddScheduleDialogState = {
    schedule: initialDialogForm,
    isStartEdit: false,
    isOpenDialog: false,
    isShowAlert: false,
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

        case ActionTypes.SHOW_ADD_SCHEDULE_DIALOG_ALERT:
            return { ...state, isShowAlert: action.payload };

        default:
            return state;
    }
}

export default addScheduleDialog;
