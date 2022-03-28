import React, { Fragment } from 'react';
import { UpdateUserDialogState } from '../../../../redux/stateTypes';
import Name from './Name';
import Mail from './Mail';
import Password from './Password';

type OutterProps = {
    user: UpdateUserDialogState['user'];
    setDialog: (dialogItem: Partial<UpdateUserDialogState['user']>) => void;
}

type UpdateUserDialogFormProps = OutterProps;

const UpdateUserDialogForm: React.FC<UpdateUserDialogFormProps> = ({ user, setDialog }) => {
    return (
        <Fragment>
            <Name name={user.name} setDialog={setDialog} />
            <Mail mail={user.email} setDialog={setDialog} />
            <Password password={user.password} setDialog={setDialog} />
        </Fragment >
    );
}

export default UpdateUserDialogForm;
