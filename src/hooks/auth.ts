import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../redux/stateTypes';
import { UserActions } from '../redux/actions/user/user';
import { asyncLogout } from '../redux/actions/effects/user';


type AuthDispatch = ThunkDispatch<State, undefined, UserActions>;

export const useLogout = () => {
    const dispatch = useDispatch<AuthDispatch>();

    return () => dispatch(asyncLogout());
}
