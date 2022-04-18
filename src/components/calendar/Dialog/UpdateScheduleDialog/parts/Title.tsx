import React, { Fragment } from 'react';
import { Input } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Schedule, UpdateScheduleDialogState } from '../../../../../redux/stateTypes';
import ErrorMessage from '../../../../app/Dialog/ErrorMessage/ErrorMessage';


const Title = withStyles({
    root: {
        marginBottom: '32',
        fontSize: '22'
    }
})(Input);

export type OutterProps = {
    title: Schedule['title'];
    setDialogForm: (updateItem: Partial<Schedule>) => void;
    errorMessage: string;
}

export type StateProps = Pick<UpdateScheduleDialogState, 'isStartEdit'>;

export type DispatchProps = {
    setStartEdit: () => void;
}


type UpdateScheduleDialogTitleProps = StateProps & DispatchProps & OutterProps;

const UpdateScheduleDialogTitle: React.FC<UpdateScheduleDialogTitleProps> = ({ title, isStartEdit, setStartEdit, setDialogForm, errorMessage }) => {
    const isError = isStartEdit && Boolean(errorMessage);
    return (
        <Fragment>
            <Title
                value={title}
                onChange={e => setDialogForm({ title: e.target.value })}
                onBlur={setStartEdit}
                error={isError}
                autoFocus
                fullWidth
                placeholder="タイトル追加"
            />
            {isError && (<ErrorMessage errorMessage={errorMessage} />)}
        </Fragment>
    );
}

export default UpdateScheduleDialogTitle;
