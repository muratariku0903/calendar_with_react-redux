import React, { Fragment } from 'react';
import { UpdateUserDialogState } from '../../../../redux/stateTypes';
import Name from './Name';
import Mail from './Mail';
import Password from './Password';
import { ErrorMessages } from '../../../../services/validation';

type OutterProps = {
    user: UpdateUserDialogState['user'];
    setDialog: (dialogItem: Partial<UpdateUserDialogState['user']>) => void;
    validateErrorMessages: ErrorMessages;
}

type UpdateUserDialogFormProps = OutterProps;

const UpdateUserDialogForm: React.FC<UpdateUserDialogFormProps> = ({ user, setDialog, validateErrorMessages }) => {
    return (
        <Fragment>
            <Name name={user.name} setDialog={setDialog} errorMessage={validateErrorMessages.name} />
            <Mail mail={user.email} setDialog={setDialog} errorMessage={validateErrorMessages.email} />
            <Password password={user.password} setDialog={setDialog} errorMessage={validateErrorMessages.password} />
        </Fragment >
    );
}

export default UpdateUserDialogForm;
