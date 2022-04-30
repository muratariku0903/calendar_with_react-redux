import React, { Fragment } from 'react';
import { LoginDialogState } from '../../../../redux/stateTypes';
import Mail from './Mail';
import Password from './Password';

type OutterProps = {
    dialog: LoginDialogState['dialog'];
    setDialog: (dialogItem: Partial<LoginDialogState['dialog']>) => void;
    validateErrorMessages: Record<string, string>;
}

type LoginDialogFormProps = OutterProps;

const LoginDialogForm: React.FC<LoginDialogFormProps> = ({ dialog, setDialog, validateErrorMessages }) => {
    return (
        <Fragment>
            <Mail mail={dialog.email} setDialog={setDialog} errorMessage={validateErrorMessages.email} />
            <Password password={dialog.password} setDialog={setDialog} errorMessage={validateErrorMessages.password} />
        </Fragment >
    );
}

export default LoginDialogForm;
