import React from 'react';
import Board, { StateProps, DispatchProps, BoardProps } from '../Board';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Schedule, State, initialDialogForm } from '../../../../redux/stateTypes';
import { SchedulesActions } from '../../../../redux/actions/schedules';
import { openAddScheduleDialog, setAddScheduleDialog } from '../../../../redux/actions/addScheduleDialog';
import { openShowScheduleDialog, setShowScheduleDialog } from '../../../../redux/actions/showScheduleDialog';
import { asyncFetchSchedules } from '../../../../redux/actions/effects/schedules';
import { asyncFetchHolidays } from '../../../../redux/actions/effects/holidays';
import { getCalendarDates } from '../../../../redux/selectors';
import { Dayjs } from 'dayjs';


// 全体のstateが更新されるととりあえず、mapStateToPropsも再度呼び出される。
const mapStateToProps = (state: State): StateProps => {
    return {
        year: state.calendar.year,
        month: state.calendar.month,
        dates: getCalendarDates(state),
    };
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        openAddDialog: (date: Dayjs) => {
            dispatch(setAddScheduleDialog({ ...initialDialogForm, date: date }));
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
        fetchHolidays: (year: number, month: number) => {
            dispatch(asyncFetchHolidays(year, month));
        },
    }
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): BoardProps => {
    return {
        ...stateProps,
        ...dispatchProps,
        fetchSchedules: () => dispatchProps.fetchSchedules(stateProps.year, stateProps.month),
        fetchHolidays: () => dispatchProps.fetchHolidays(stateProps.year, stateProps.month),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Board);
