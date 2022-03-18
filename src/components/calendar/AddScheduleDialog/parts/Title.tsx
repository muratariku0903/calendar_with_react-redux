import React from 'react';
import { Input } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { DialogSchedule } from '../../../../redux/stateTypes';


const Title = withStyles({
    root: {
        marginBottom: '32',
        fontSize: '22'
    }
})(Input);


type AddScheduleDialogTitleProps = {
    title: DialogSchedule['title'];
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
}

const AddScheduleDialogTitle: React.FC<AddScheduleDialogTitleProps> = ({ title, setDialogForm }) => {
    return (
        <Title value={title} onChange={e => setDialogForm({ title: e.target.value })} autoFocus fullWidth placeholder="タイトル追加" />
    );
}

export default AddScheduleDialogTitle;
