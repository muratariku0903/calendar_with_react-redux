import Login, { StateProps, DispatchProps, LoginProps } from '../Login';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { State, LoginDialogState } from '../../../../redux/stateTypes';
import { UserActions } from '../../../../redux/actions/auth/user';
import { setLoginDialog } from '../../../../redux/actions/auth/loginDialog';
import { asyncLogin } from '../../../../redux/actions/effects/user';


const mapStateToProps = (state: State): StateProps => {
    return {
        dialog: state.loginDialog.dialog,
    };
};

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, UserActions>): DispatchProps => {
    return {
        setDialog: (dialog: LoginDialogState['dialog']) => dispatch(setLoginDialog(dialog)),
        login: (dialog: LoginDialogState['dialog']) => dispatch(asyncLogin(dialog)),
    };
};

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): LoginProps => {
    return {
        ...stateProps,
        ...dispatchProps,
        setDialog: (dialogItem: Partial<LoginDialogState['dialog']>) => dispatchProps.setDialog({ ...stateProps.dialog, ...dialogItem }),
        login: () => dispatchProps.login(stateProps.dialog),
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Login);
