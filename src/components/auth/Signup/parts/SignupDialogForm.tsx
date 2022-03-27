import React, { Fragment } from 'react';
import { SignupDialogState } from '../../../../redux/stateTypes';
import Name from './Name';
import Mail from './Mail';
import Password from './Password';

type OutterProps = {
    dialog: SignupDialogState['dialog'];
    setDialog: (dialogItem: Partial<SignupDialogState['dialog']>) => void;
}

type AddUserDialogFormProps = OutterProps;

const AddUserDialogForm: React.FC<AddUserDialogFormProps> = ({ dialog, setDialog }) => {
    return (
        <Fragment>
            <Name name={dialog.name} setDialog={setDialog} />
            <Mail mail={dialog.email} setDialog={setDialog} />
            <Password password={dialog.password} setDialog={setDialog} />
        </Fragment >
    );
}

export default AddUserDialogForm;
