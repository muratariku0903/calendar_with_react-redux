import { UserState } from '../../stateTypes';
import { UserActions } from '../../actions/auth/user';
import { ActionTypes } from '../../actionTypes';


const initialState: UserState = {
    user: {
        name: '',
        email: '',
        password: '',
    },
    isLogin: false,
}


const user = (state = initialState, action: UserActions): UserState => {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return { ...state, user: action.payload, isLogin: true };

        case ActionTypes.LOGIN_USER:
            return { ...state, isLogin: true };

        case ActionTypes.LOGOUT_USER:
            return initialState;

        default:
            return state;
    }
}

export default user;

