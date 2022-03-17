import ScheduleLabel, { DispatchProps } from '../ScheduleLabel';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Schedule } from '../../../../redux/stateTypes';
import { openShowScheduleDialog, setShowScheduleDialog } from '../../../../redux/actions/showScheduleDialog';


const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        openShowDialog: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, schedule: Schedule) => {
            e.stopPropagation();
            console.log(schedule);
            dispatch(setShowScheduleDialog(schedule));
            dispatch(openShowScheduleDialog());
        },
    }
}

export default connect(null, mapDispatchToProps)(ScheduleLabel);