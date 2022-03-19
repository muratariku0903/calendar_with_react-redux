import React, { Fragment } from 'react';
import { DialogSchedule } from '../../../../redux/stateTypes';
import AddScheduleDialogTitle from '../containers/Title';
import AddScheduleDialogDate from './Date';
import AddScheduleDialogTime from './Time';
import AddScheduleDialogLocation from './Location';
import AddScheduleDialogDescription from './Description';


type AddScheduleDialogFormProps = {
    schedule: DialogSchedule;
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
}

const AddScheduleDialogForm: React.FC<AddScheduleDialogFormProps> = ({ schedule, setDialogForm }) => {
    return (
        <Fragment>
            <AddScheduleDialogTitle title={schedule.title} setDialogForm={setDialogForm} />
            <AddScheduleDialogDate date={schedule.date} setDialogForm={setDialogForm} />
            <AddScheduleDialogTime time={schedule.time} setDialogForm={setDialogForm} />
            <AddScheduleDialogLocation location={schedule.location} setDialogForm={setDialogForm} />
            <AddScheduleDialogDescription description={schedule.description} setDialogForm={setDialogForm} />
        </Fragment>
    );
}

export default AddScheduleDialogForm;
