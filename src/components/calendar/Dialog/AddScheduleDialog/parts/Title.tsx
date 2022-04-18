import React, { Fragment } from 'react';
import { Input } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { DialogSchedule } from '../../../../../redux/stateTypes';
import ErrorMessage from '../../../../app/Dialog/ErrorMessage/ErrorMessage';


const Title = withStyles({
    root: {
        marginBottom: '32',
        fontSize: '22'
    }
})(Input);

export type OutterProps = {
    title: DialogSchedule['title'];
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
    errorMessage: string;
}

export type StateProps = {
    isStartEdit: boolean;
}

export type DispatchProps = {
    setStartEdit: () => void;
}

export type AddScheduleDialogTitleProps = StateProps & DispatchProps & OutterProps;

const AddScheduleDialogTitle: React.FC<AddScheduleDialogTitleProps> = ({ title, isStartEdit, setDialogForm, errorMessage, setStartEdit }) => {
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

export default AddScheduleDialogTitle;
