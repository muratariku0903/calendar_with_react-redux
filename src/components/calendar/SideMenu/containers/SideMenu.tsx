import SideMenu, { DispatchProps, StateProps } from '../SideMenu';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State, Schedule, initialDialogForm } from '../../../../redux/stateTypes';
import { closeSideMenu } from '../../../../redux/actions/calendar/sideMenu';
import { openAddScheduleDialog,setAddScheduleDialog } from '../../../../redux/actions/calendar/addScheduleDialog';


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
            dispatch(setAddScheduleDialog({ ...initialDialogForm, date: date }));
            dispatch(openAddScheduleDialog());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
