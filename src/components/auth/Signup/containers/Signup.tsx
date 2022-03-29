import Signup, { StateProps, DispatchProps, SignupProps } from '../Signup';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { State, SignupDialogState } from '../../../../redux/stateTypes';
import { UserActions } from '../../../../redux/actions/user/user';
import { setSignupDialog } from '../../../../redux/actions/auth/signupDialog';
import { asyncSignup } from '../../../../redux/actions/effects/user';


const mapStateToProps = (state: State): StateProps => {
    return {
        dialog: state.signupDialog.dialog,
        isLogin: state.user.isLogin,
    };
};

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, UserActions>): DispatchProps => {
    return {
        setDialog: (dialog: SignupDialogState['dialog']) => dispatch(setSignupDialog(dialog)),
        signup: (dialog: SignupDialogState['dialog']) => dispatch(asyncSignup(dialog)),
    };
};

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): SignupProps => {
    return {
        ...stateProps,
        ...dispatchProps,
        setDialog: (dialogItem: Partial<SignupDialogState['dialog']>) => dispatchProps.setDialog({ ...stateProps.dialog, ...dialogItem }),
        signup: () => dispatchProps.signup(stateProps.dialog),
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Signup);
