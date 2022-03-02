import React from 'react';
import Board from '../Board';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Schedule, State } from '../../../../redux/stateTypes';
import { getCalendarDates } from '../../../../redux/selectors';
import { openAddScheduleDialog, setAddScheduleDialog } from '../../../../redux/actions/addScheduleDialog';
import { Dayjs } from 'dayjs';
import { openShowScheduleDialog, setShowScheduleDialog } from '../../../../redux/actions/showScheduleDialog';
import { asyncFetchSchedules } from '../../../../redux/actions/effects/schedules';
import { SchedulesActions } from '../../../../redux/actions/schedules';

// 全体のstateが更新されるととりあえず、mapStateToPropsも再度呼び出される。
const mapStateToProps = (state: State) => {
    return {
        year: state.calendar.year,
        month: state.calendar.month,
        dates: getCalendarDates(state),
    };
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>) => {
    return {
        openAddDialog: (date: Dayjs) => {
            dispatch(setAddScheduleDialog({ date: date }));
            dispatch(openAddScheduleDialog());
        },
        openShowDialog: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, schedule: Schedule) => {
            e.stopPropagation();
            console.log(schedule);
            dispatch(setShowScheduleDialog(schedule));
            dispatch(openShowScheduleDialog());
        },
        fetchSchedules: (year: number, month: number) => {
            dispatch(asyncFetchSchedules(year, month));
        },
    }
}

const mergeProps = (stateProps: any, dispatchProps: any) => {
    return {
        year: stateProps.year,
        month: stateProps.month,
        dates: stateProps.dates,
        openAddDialog: dispatchProps.openAddDialog,
        openShowDialog: dispatchProps.openShowDialog,
        fetchSchedules: () => dispatchProps.fetchSchedules(stateProps.year, stateProps.month),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Board);
