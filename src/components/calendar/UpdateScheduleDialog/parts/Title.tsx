import React, { Fragment } from 'react';
import { Input, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Schedule, UpdateScheduleDialogState } from '../../../../redux/stateTypes';


const Title = withStyles({
    root: {
        marginBottom: '32',
        fontSize: '22'
    }
})(Input);

export type OutterProps = {
    title: Schedule['title'];
    setUpdateDialog: (updateItem: Partial<Schedule>) => void;
}

export type StateProps = Pick<UpdateScheduleDialogState, 'isStartEdit'>;

export type DispatchProps = {
    setStartEdit: () => void;
}


type UpdateScheduleDialogTitleProps = StateProps & DispatchProps & OutterProps;

const UpdateScheduleDialogTitle: React.FC<UpdateScheduleDialogTitleProps> = ({ title, isStartEdit, setStartEdit, setUpdateDialog }) => {
    const isError = isStartEdit && !title;
    console.log(isError, isStartEdit, !title);
    return (
        <Fragment>
            <Title
                value={title}
                onChange={e => setUpdateDialog({ title: e.target.value })}
                onBlur={setStartEdit}
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

export default UpdateScheduleDialogTitle;
