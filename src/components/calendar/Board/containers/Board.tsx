import React from 'react';
import Board from '../Board';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Schedule, State } from '../../../../redux/stateTypes';
import { getCalendarDates } from '../../../../redux/selectors';
import { openAddScheduleDialog, setAddScheduleDialog } from '../../../../redux/actions/addScheduleDialog';
import { Dayjs } from 'dayjs';
import { openShowScheduleDialog, setShowScheduleDialog } from '../../../../redux/actions/showScheduleDialog';

const mapStateToProps = (state: State) => {
    return {
        month: state.calendar.month,
        dates: getCalendarDates(state),
        schedules: state.schedules.dateSchedules,
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        openAddDialog: (date: Dayjs) => {
            dispatch(setAddScheduleDialog({ date: date }));
            dispatch(openAddScheduleDialog());
        },
        openShowDialog: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, schedule: Schedule) => {
            e.stopPropagation();
            dispatch(setShowScheduleDialog(schedule));
            dispatch(openShowScheduleDialog());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
