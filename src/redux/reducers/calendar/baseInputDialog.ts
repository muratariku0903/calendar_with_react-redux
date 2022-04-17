import { BaseInputDialogState } from "../../stateTypes"
import { BaseInputDialogActions } from "../../actions/calendar/baseInputDialog"
import { ActionTypes } from "../../actionTypes"

const initialState: BaseInputDialogState = {
    isOpenDialog: false,
    isStartEdit: false,
    isShowAlert: false,
}

const baseInputDialog = (state = initialState, action: BaseInputDialogActions): BaseInputDialogState => {
    switch (action.type) {
        case ActionTypes.OPEN_BASE_INPUT_DIALOG:
            return { ...state, isOpenDialog: true };
        case ActionTypes.CLOSE_BASE_INPUT_DIALOG:
            return initialState;
        case ActionTypes.START_EDIT_BASE_INPUT_DIALOG:
            return { ...state, isStartEdit: true };
        case ActionTypes.SHOW_BASE_INPUT_DIALOG_ALERT:
            return { ...state, isShowAlert: action.payload };
        default:
            return state;
    }
}

export default baseInputDialog;
