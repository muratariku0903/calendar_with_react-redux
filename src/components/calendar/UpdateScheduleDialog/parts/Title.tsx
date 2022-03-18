import React from 'react';
import { Input } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Schedule } from '../../../../redux/stateTypes';


const Title = withStyles({
    root: {
        marginBottom: '32',
        fontSize: '22'
    }
})(Input);


type UpdateScheduleDialogTitleProps = {
    title: Schedule['title'];
    setUpdateDialog: (updateItem: Partial<Schedule>) => void;
}

const UpdateScheduleDialogTitle: React.FC<UpdateScheduleDialogTitleProps> = ({ title, setUpdateDialog }) => {
    return (
        <Title value={title} onChange={e => setUpdateDialog({ title: e.target.value })} autoFocus fullWidth placeholder="タイトル追加" />
    );
}

export default UpdateScheduleDialogTitle;
