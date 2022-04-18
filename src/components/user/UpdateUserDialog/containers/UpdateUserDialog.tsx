import UpdateUserDialog, { StateProps, DispatchProps, UpdateUserDialogProps } from '../UpdateUserDialog';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { State, UpdateUserDialogState } from '../../../../redux/stateTypes';
import { UserActions } from '../../../../redux/actions/user/user';
import { setUpdateUserDialog, closeUpdateUserDialog, startEditUpdateUserDialog, showUpdateUserDialogAlert } from '../../../../redux/actions/user/updateUserDialog';
import { asyncUpdate } from '../../../../redux/actions/effects/user';
import { isEmptyDialog } from '../../../../services/dialog';


const mapStateToProps = (state: State): StateProps => {
    return {
        dialog: state.updateUserDialog,
    };
};


const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, UserActions>): DispatchProps => {
    return {
        setDialog: (user: UpdateUserDialogState['user']) => {
            dispatch(setUpdateUserDialog(user));
            dispatch(startEditUpdateUserDialog());
        },
        update: (user: UpdateUserDialogState['user']) => {
            dispatch(asyncUpdate(user));
            dispatch(closeUpdateUserDialog());
        },
        closeDialog: () => dispatch(closeUpdateUserDialog()),
        showAlert: () => dispatch(showUpdateUserDialogAlert(true)),
        closeAlert: () => dispatch(showUpdateUserDialogAlert(false)),
    };
};

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): UpdateUserDialogProps => {
    return {
        ...stateProps,
        ...dispatchProps,
        setDialog: (userItem: Partial<UpdateUserDialogState['user']>) => dispatchProps.setDialog({ ...stateProps.dialog.user, ...userItem }),
        update: () => dispatchProps.update(stateProps.dialog.user),
        isEmptyDialog: () => isEmptyDialog(stateProps.dialog.user),
    };
};


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UpdateUserDialog);
