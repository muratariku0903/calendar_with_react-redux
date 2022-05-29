import React, { Fragment } from 'react';
import AddScheduleDialog from './AddScheduleDialog/containers/AddScheduleDialog';
import UpdateScheduleDialog from './UpdateScheduleDialog/containers/UpdateScheduleDialog';
import ShowScheduleDialog from './ShowScheduleDialog/containers/ShowScheduleDialog';
import EmailScheduleDialog from './EmailScheduleDialog/containers/EmailScheduleDialog';


const Dialog: React.FC = () => {
    return (
        <Fragment>
            <AddScheduleDialog />
            <UpdateScheduleDialog />
            <ShowScheduleDialog />
            <EmailScheduleDialog />
        </Fragment>
    )
};

export default Dialog;
