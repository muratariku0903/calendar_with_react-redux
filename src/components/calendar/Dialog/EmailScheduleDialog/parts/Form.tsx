import React, { Fragment } from 'react';
import { EmailScheduleDialogState } from '../../../../../redux/stateTypes';
import UpdateScheduleDialogTitle from './Title';
import UpdateScheduleDialogDescription from './Description';


type EmailScheduleDialogFormProps = {
    form: EmailScheduleDialogState['form'];
    setDialogForm: (item: Partial<EmailScheduleDialogState['form']>) => void;
    errorMessages: Record<string, string>;
}

const EmailScheduleDialogForm: React.FC<EmailScheduleDialogFormProps> = ({ form, setDialogForm, errorMessages }) => {
    return (
        <Fragment>
            <UpdateScheduleDialogTitle title={form.title} setDialogForm={setDialogForm} errorMessage={errorMessages.title} />
            <UpdateScheduleDialogDescription description={form.description} setDialogForm={setDialogForm} errorMessage={errorMessages.description} />
        </Fragment>
    );
}

export default EmailScheduleDialogForm;
