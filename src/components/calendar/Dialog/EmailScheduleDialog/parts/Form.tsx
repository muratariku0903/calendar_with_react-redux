import React, { Fragment } from 'react';
import { EmailScheduleDialogState } from '../../../../../redux/stateTypes';
import EmailScheduleDialogEmail from './Email';
import EmailScheduleDialogTitle from './Title';
import EmailScheduleDialogDescription from './Description';


type EmailScheduleDialogFormProps = {
    form: EmailScheduleDialogState['form'];
    setDialogForm: (item: Partial<EmailScheduleDialogState['form']>) => void;
    errorMessages: Record<string, string>;
}

const EmailScheduleDialogForm: React.FC<EmailScheduleDialogFormProps> = ({ form, setDialogForm, errorMessages }) => {
    return (
        <Fragment>
            <EmailScheduleDialogEmail email={form.email} setDialogForm={setDialogForm} errorMessage={errorMessages.email} />
            <EmailScheduleDialogTitle title={form.title} setDialogForm={setDialogForm} errorMessage={errorMessages.title} />
            <EmailScheduleDialogDescription description={form.description} setDialogForm={setDialogForm} errorMessage={errorMessages.description} />
        </Fragment>
    );
}

export default EmailScheduleDialogForm;
