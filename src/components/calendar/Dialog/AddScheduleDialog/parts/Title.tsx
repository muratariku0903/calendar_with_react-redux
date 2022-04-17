import React, { Fragment } from 'react';
import { Typography, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { DialogSchedule } from '../../../../../redux/stateTypes';


const Title = withStyles({
    root: {
        marginBottom: '32',
        fontSize: '22'
    }
})(Input);

export type OutterProps = {
    title: DialogSchedule['title'];
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
}

export type StateProps = {
    isStartEdit: boolean;
}

export type DispatchProps = {
    setStartEdit: () => void;
}

export type AddScheduleDialogTitleProps = StateProps & DispatchProps & OutterProps;

const AddScheduleDialogTitle: React.FC<AddScheduleDialogTitleProps> = ({ title, isStartEdit, setDialogForm }) => {
    const isError = isStartEdit && !title;
    return (
        <Fragment>
            <Title
                value={title}
                onChange={e => setDialogForm({ title: e.target.value })}
                error={isError}
                autoFocus
                fullWidth
                placeholder="タイトル追加"
            />
            <div>
                {isError && (
                    <Typography variant="caption" component="div" color="error">タイトルは必須です。</Typography>
                )}
            </div>
        </Fragment>
    );
}

export default AddScheduleDialogTitle;
