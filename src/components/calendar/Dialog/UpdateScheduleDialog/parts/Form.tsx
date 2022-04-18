import React, { Fragment } from 'react';
import { DialogSchedule } from '../../../../../redux/stateTypes';
import { ErrorMessages } from '../../../../../services/validation';
import UpdateScheduleDialogTitle from './Title';
import UpdateScheduleDialogDate from './Date';
import UpdateScheduleDialogTime from './Time';
import UpdateScheduleDialogLocation from './Location';
import UpdateScheduleDialogDescription from './Description';


type UpdateScheduleDialogFormProps = {
    schedule: DialogSchedule;
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
    errorMessages: ErrorMessages;
}

const UpdateScheduleDialogForm: React.FC<UpdateScheduleDialogFormProps> = ({ schedule, setDialogForm, errorMessages }) => {
    return (
        <Fragment>
            <UpdateScheduleDialogTitle title={schedule.title} setDialogForm={setDialogForm} errorMessage={errorMessages.title} />
            <UpdateScheduleDialogDate date={schedule.date} setDialogForm={setDialogForm} />
            <UpdateScheduleDialogTime time={schedule.time} setDialogForm={setDialogForm} errorMessage={errorMessages.time} />
            <UpdateScheduleDialogLocation location={schedule.location} setDialogForm={setDialogForm} />
            <UpdateScheduleDialogDescription description={schedule.description} setDialogForm={setDialogForm} />
        </Fragment>
    );
}

export default UpdateScheduleDialogForm;
