import SideMenu, { DispatchProps, StateProps } from '../SideMenu';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State, Schedule, initialDialogForm } from '../../../../redux/stateTypes';
import { closeSideMenu } from '../../../../redux/actions/calendar/sideMenu';
import { openAddScheduleDialog, setAddScheduleDialog } from '../../../../redux/actions/calendar/addScheduleDialog';
import { getCurrHourAndCurrMinute } from '../../../../services/calendar';
import dayjs from 'dayjs';


const mapStateToProps = (state: State): StateProps => {
    return {
        year: state.calendar.year,
        month: state.calendar.month,
        isOpen: state.sideMenu.isOpen,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        close: () => dispatch(closeSideMenu()),
        openAddDialog: (date: Schedule['date']) => {
            const { hour, minute } = getCurrHourAndCurrMinute();
            const start = dayjs.unix(date).hour(hour).minute(minute).unix();
            const end = dayjs.unix(start).add(1, 'h').unix();
            dispatch(setAddScheduleDialog({ ...initialDialogForm, date, time: { start, end } }));
            dispatch(openAddScheduleDialog());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
