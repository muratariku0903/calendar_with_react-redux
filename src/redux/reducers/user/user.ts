import { UserState } from '../../stateTypes';
import { UserActions } from '../../actions/user/user';
import { ActionTypes } from '../../actionTypes';


const initialState: UserState = {
    user: {
        name: '',
        email: '',
        password: '',
    },
    isLogin: false,
    isLoading: false,
}


const user = (state = initialState, action: UserActions): UserState => {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return {
                ...state,
                user: action.payload,
                isLogin: true,
                isLoading: false,
            };

        case ActionTypes.RESET_USER:
            return initialState;

        case ActionTypes.SET_USER_LOADING:
            return { ...state, isLoading: action.payload };

        default:
            return state;
    }
}

export default user;

