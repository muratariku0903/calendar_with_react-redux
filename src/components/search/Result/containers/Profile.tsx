import Profile, { StateProps, DispatchProps } from '../Result';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { State, UpdateUserDialogState } from '../../../../redux/stateTypes';
import { UserActions } from '../../../../redux/actions/user/user';
import { openUpdateUserDialog, setUpdateUserDialog } from '../../../../redux/actions/user/updateUserDialog';


const mapStateToProps = (state: State): StateProps => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, UserActions>): DispatchProps => {
    return {
        openUpdateUserDialog: (user: UpdateUserDialogState['user']) => {
            dispatch(setUpdateUserDialog(user));
            dispatch(openUpdateUserDialog());
        },
    };
};

// const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): ProfileProps => {
//     return {
//         ...stateProps,
//         ...dispatchProps,
//         openUpdateUserDialog: () => dispatchProps.openUpdateUserDialog(stateProps.user.user),
//     };
// };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
