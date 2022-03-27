import { LoginDialogState } from "../../stateTypes";
import { LoginDialogActions } from "../../actions/auth/loginDialog";
import { ActionTypes } from "../../actionTypes";


const initialState: LoginDialogState = {
    dialog: {
        email: '',
        password: '',
    },
    isShowAlert: false,
};


const signupDialog = (state = initialState, action: LoginDialogActions): LoginDialogState => {
    switch (action.type) {
        case ActionTypes.SET_LOGIN_DIALOG:
            return { ...state, dialog: action.payload };

        case ActionTypes.SHOW_LOGIN_DIALOG_ALERT:
            return { ...state, isShowAlert: action.payload };

        default:
            return state;
    }
}

export default signupDialog;
