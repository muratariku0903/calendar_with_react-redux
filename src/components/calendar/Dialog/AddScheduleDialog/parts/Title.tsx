import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { State, DialogSchedule } from '../../../../../redux/stateTypes';
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

export type AddScheduleDialogTitleProps =  OutterProps;

const AddScheduleDialogTitle: React.FC<AddScheduleDialogTitleProps> = ({ title, setDialogForm, errorMessage }) => {
    const isStartEdit = useSelector((state: State) => state.addScheduleDialog.isStartEdit);
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

export default AddScheduleDialogTitle;
