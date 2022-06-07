import Navigation from '../Navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../../../../redux/stateTypes';
import { UserActions } from '../../../../redux/actions/user/user';
import { asyncLogout } from '../../../../redux/actions/effects/user';


const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, UserActions>) => {
    return {
        logout: () => dispatch(asyncLogout()),
    }
}

export default connect(null, mapDispatchToProps)(Navigation);
