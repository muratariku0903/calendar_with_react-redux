import React, { Fragment } from 'react';
import { LoginDialogState } from '../../../../redux/stateTypes';
import Mail from './Mail';
import Password from './Password';

type OutterProps = {
    dialog: LoginDialogState['dialog'];
    setDialog: (dialogItem: Partial<LoginDialogState['dialog']>) => void;
}

type LoginDialogFormProps = OutterProps;

const LoginDialogForm: React.FC<LoginDialogFormProps> = ({ dialog, setDialog }) => {
    return (
        <Fragment>
            <Mail mail={dialog.email} setDialog={setDialog} />
            <Password password={dialog.password} setDialog={setDialog} />
        </Fragment >
    );
}

export default LoginDialogForm;
