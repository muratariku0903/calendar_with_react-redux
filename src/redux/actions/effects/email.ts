import { closeEmailScheduleDialog, EmailScheduleDialogActions, setEmailScheduleDialogLoading } from '../calendar/emailScheduleDialog';
import { setSnackBar } from '../app/snackBar';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { State } from '../../stateTypes';
import { emailApi } from '../../../api/EmailJS/EmailJSApi';
import { EmailTemplateParams } from '../../../api/EmailJS/types';

type EmailThunkAction = ThunkAction<void, State, undefined, EmailScheduleDialogActions>;

export const asyncSendEmail = (params: Omit<EmailTemplateParams, 'emailTo'>, emailTos: string[]): EmailThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setEmailScheduleDialogLoading(true));
    try {
        for (const emailTo of emailTos) await emailApi.send({ ...params, emailTo });
        dispatch(setSnackBar('success', 'メールを送信しました'));
    } catch (e) {
        dispatch(setSnackBar('error', 'メール送信に失敗しました'));
        console.error(`Error sending email because:${e}`);
    } finally {
        dispatch(closeEmailScheduleDialog());
        dispatch(setEmailScheduleDialogLoading(false));
    }
}
