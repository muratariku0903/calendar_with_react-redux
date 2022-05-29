import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { State, Schedule } from '../../../../../redux/stateTypes';
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


type UpdateScheduleDialogTitleProps =  OutterProps;

const UpdateScheduleDialogTitle: React.FC<UpdateScheduleDialogTitleProps> = ({ title, setDialogForm, errorMessage }) => {
    const isStartEdit = useSelector((state: State) => state.updateScheduleDialog.isStartEdit);
    const isError = isStartEdit && Boolean(errorMessage);
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
            {isError && (<ErrorMessage errorMessage={errorMessage} />)}
        </Fragment>
    );
}

export default UpdateScheduleDialogTitle;
