import { SignupDialogState } from "../../stateTypes";
import { SignupDialogActions } from "../../actions/auth/signupDialog";
import { ActionTypes } from "../../actionTypes";


const initialState: SignupDialogState = {
    dialog: {
        email: '',
        password: '',
        name: '',
    },
    isShowAlert: false,
};


const signupDialog = (state = initialState, action: SignupDialogActions): SignupDialogState => {
    switch (action.type) {
        case ActionTypes.SET_SIGNUP_DIALOG:
            return { ...state, dialog: action.payload };

        case ActionTypes.SHOW_SIGNUP_DIALOG_ALERT:
            return { ...state, isShowAlert: action.payload };

        default:
            return state;
    }
}

export default signupDialog;
