import EmailScheduleDialog, { StateProps, DispatchProps, EmailScheduleDialogProps } from '../EmailScheduleDialog';
import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { EmailScheduleDialogState, State } from '../../../../../redux/stateTypes';
import { SchedulesActions } from '../../../../../redux/actions/calendar/schedules';
import { closeEmailScheduleDialog, setEmailScheduleDialog, startEditEmailScheduleDialog, showEmailScheduleDialogAlert } from '../../../../../redux/actions/calendar/emailScheduleDialog';
import { isEmptyDialog } from '../../../../../services/dialog';


const mapStateToProps = (state: State): StateProps => {
    return {
        dialog: state.emailScheduleDialog,
    }
};

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        setDialogForm: (dialog: EmailScheduleDialogState['form']) => {
            dispatch(setEmailScheduleDialog(dialog));
            dispatch(startEditEmailScheduleDialog());
        },
        closeDialog: () => dispatch(closeEmailScheduleDialog()),
        showAlert: () => dispatch(showEmailScheduleDialogAlert(true)),
        closeAlert: () => dispatch(showEmailScheduleDialogAlert(false)),
    }
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): EmailScheduleDialogProps => {
    return {
        ...stateProps,
        ...dispatchProps,
        isEmptyDialog: () => isEmptyDialog<EmailScheduleDialogState['form']>(stateProps.dialog.form, ['date']),
        setDialogForm: (item: Partial<EmailScheduleDialogState['form']>) => dispatchProps.setDialogForm({ ...stateProps.dialog.form, ...item }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(EmailScheduleDialog);
