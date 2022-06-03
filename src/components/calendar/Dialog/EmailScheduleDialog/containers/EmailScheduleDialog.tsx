import EmailScheduleDialog, { StateProps, DispatchProps, EmailScheduleDialogProps } from '../EmailScheduleDialog';
import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { EmailScheduleDialogState, State, UserState } from '../../../../../redux/stateTypes';
import { SchedulesActions } from '../../../../../redux/actions/calendar/schedules';
import { closeEmailScheduleDialog, setEmailScheduleDialog, startEditEmailScheduleDialog, showEmailScheduleDialogAlert } from '../../../../../redux/actions/calendar/emailScheduleDialog';
import { asyncSendEmail } from '../../../../../redux/actions/effects/email';
import { getDateStrFromTimeStamp, getHourMinuteStrFromTimeStamp } from '../../../../../services/calendar';
import { isEmptyDialog } from '../../../../../services/dialog';


const mapStateToProps = (state: State): StateProps => {
    return {
        dialog: state.emailScheduleDialog,
        emailFrom: state.user.user.email,
    }
};

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        setDialogForm: (form: EmailScheduleDialogState['form']) => {
            dispatch(setEmailScheduleDialog(form));
            dispatch(startEditEmailScheduleDialog());
        },
        closeDialog: () => dispatch(closeEmailScheduleDialog()),
        showAlert: () => dispatch(showEmailScheduleDialogAlert(true)),
        closeAlert: () => dispatch(showEmailScheduleDialogAlert(false)),
        sendEmail: (form: EmailScheduleDialogState['form'], schedule: EmailScheduleDialogState['schedule'], emailFrom: UserState['user']['email']) => {
            const date = getDateStrFromTimeStamp(schedule.date);
            const startHourMinute = getHourMinuteStrFromTimeStamp(schedule.time.start);
            const endHourMinute = getHourMinuteStrFromTimeStamp(schedule.time.end);
            const time = `${startHourMinute}~${endHourMinute}`;
            dispatch(asyncSendEmail({ ...form, ...schedule, date, time, emailFrom }));
        },
    }
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): EmailScheduleDialogProps => {
    return {
        ...stateProps,
        ...dispatchProps,
        isEmptyDialog: () => isEmptyDialog<EmailScheduleDialogState['form']>(stateProps.dialog.form, ['date']),
        setDialogForm: (item: Partial<EmailScheduleDialogState['form']>) => dispatchProps.setDialogForm({ ...stateProps.dialog.form, ...item }),
        sendEmail: () => dispatchProps.sendEmail(stateProps.dialog.form, stateProps.dialog.schedule, stateProps.emailFrom),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(EmailScheduleDialog);
