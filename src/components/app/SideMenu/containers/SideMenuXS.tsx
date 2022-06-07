import SideMenuXS, { DispatchProps } from '../SideMenuXS';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State, Schedule, initialDialogForm } from '../../../../redux/stateTypes';
import { closeSideMenu } from '../../../../redux/actions/calendar/sideMenu';
import { openAddScheduleDialog, setAddScheduleDialog } from '../../../../redux/actions/calendar/addScheduleDialog';
import { getCurrHourAndCurrMinute } from '../../../../services/calendar';
import dayjs from 'dayjs';


const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        openAddDialog: (date: Schedule['date']) => {
            const { hour, minute } = getCurrHourAndCurrMinute();
            const start = dayjs.unix(date).hour(hour).minute(minute).unix();
            const end = dayjs.unix(start).add(1, 'h').unix();
            dispatch(setAddScheduleDialog({ ...initialDialogForm, date, time: { start, end } }));
            dispatch(openAddScheduleDialog());
        },
    }
}

export default connect(null, mapDispatchToProps)(SideMenuXS);
