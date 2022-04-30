import React, { Fragment } from 'react';
import { DialogSchedule } from '../../../../../redux/stateTypes';
import AddScheduleDialogTitle from './Title';
import AddScheduleDialogDate from './Date';
import AddScheduleDialogTime from './Time';
import AddScheduleDialogLocation from './Location';
import AddScheduleDialogDescription from './Description';

type OutterProps = {
    schedule: DialogSchedule;
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
    errorMessages: Record<string, string>;
}

type AddScheduleDialogFormProps = OutterProps;

const AddScheduleDialogForm: React.FC<AddScheduleDialogFormProps> = ({ schedule, setDialogForm, errorMessages }) => {
    return (
        <Fragment>
            <AddScheduleDialogTitle title={schedule.title} setDialogForm={setDialogForm} errorMessage={errorMessages.title} />
            <AddScheduleDialogDate date={schedule.date} setDialogForm={setDialogForm} />
            <AddScheduleDialogTime time={schedule.time} setDialogForm={setDialogForm} errorMessage={errorMessages.time} />
            <AddScheduleDialogLocation location={schedule.location} setDialogForm={setDialogForm} />
            <AddScheduleDialogDescription description={schedule.description} setDialogForm={setDialogForm} errorMessage={errorMessages.description} />
        </Fragment>
    );
}

export default AddScheduleDialogForm;
