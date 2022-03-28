import Profile, { StateProps, DispatchProps } from '../Profile';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../../../../redux/stateTypes';
import { UserActions } from '../../../../redux/actions/auth/user';
import { asyncLogout } from '../../../../redux/actions/effects/user';


const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, UserActions>): DispatchProps => {
    return {
        logout: () => dispatch(asyncLogout()),
    }
}

const mapStateToProps = (state: State): StateProps => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
