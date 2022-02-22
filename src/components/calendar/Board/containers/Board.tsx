import Board from '../Board';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '../../../../redux/stateTypes';
import { getCalendarDates } from '../../../../redux/selectors';
import { openAddScheduleDialog, setAddScheduleDialog } from '../../../../redux/actions/addScheduleDialog';
import { Dayjs } from 'dayjs';

const mapStateToProps = (state: State) => {
    return {
        month: state.calendar.month,
        dates: getCalendarDates(state),
        schedules: state.schedules.schedules,
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        openDialog: (date: Dayjs) => {
            dispatch(setAddScheduleDialog({ date: date }));
            dispatch(openAddScheduleDialog());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
