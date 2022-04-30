import React, { Fragment } from 'react';
import { SignupDialogState } from '../../../../redux/stateTypes';
import Name from './Name';
import Mail from './Mail';
import Password from './Password';

type OutterProps = {
    dialog: SignupDialogState['dialog'];
    setDialog: (dialogItem: Partial<SignupDialogState['dialog']>) => void;
    validateErrorMessages: Record<string, string>;
}

type AddUserDialogFormProps = OutterProps;

const AddUserDialogForm: React.FC<AddUserDialogFormProps> = ({ dialog, setDialog, validateErrorMessages }) => {
    return (
        <Fragment>
            <Name name={dialog.name} setDialog={setDialog} errorMessage={validateErrorMessages.name} />
            <Mail mail={dialog.email} setDialog={setDialog} errorMessage={validateErrorMessages.email} />
            <Password password={dialog.password} setDialog={setDialog} errorMessage={validateErrorMessages.password} />
        </Fragment >
    );
}

export default AddUserDialogForm;
