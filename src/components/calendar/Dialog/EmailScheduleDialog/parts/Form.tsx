import React, { Fragment } from 'react';
import { EmailScheduleDialogState } from '../../../../../redux/stateTypes';
import EmailScheduleDialogEmail from './Email';
import EmailScheduleDialogTitle from './Title';
import EmailScheduleDialogDescription from './Message';


type EmailScheduleDialogFormProps = {
    form: EmailScheduleDialogState['form'];
    setDialogForm: (item: Partial<EmailScheduleDialogState['form']>) => void;
    errorMessages: Record<string, string>;
}

const EmailScheduleDialogForm: React.FC<EmailScheduleDialogFormProps> = ({ form, setDialogForm, errorMessages }) => {
    return (
        <Fragment>
            <EmailScheduleDialogEmail emailTo={form.emailTo} setDialogForm={setDialogForm} errorMessage={errorMessages.emailTo} />
            <EmailScheduleDialogTitle emailTitle={form.emailTitle} setDialogForm={setDialogForm} errorMessage={errorMessages.emailTitle} />
            <EmailScheduleDialogDescription emailMessage={form.emailMessage} setDialogForm={setDialogForm} errorMessage={errorMessages.emailMessage} />
        </Fragment>
    );
}

export default EmailScheduleDialogForm;
