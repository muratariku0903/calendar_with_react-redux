import WeekBoard, { StateProps } from '../WeekBoard';
import { connect } from 'react-redux';
import { State } from '../../../../../redux/stateTypes';
import { getCalendarWeekDates } from '../../../../../redux/selectors';


const mapStateToProps = (state: State): StateProps => {
    return {
        dates: getCalendarWeekDates(state),
    };
}


export default connect(mapStateToProps)(WeekBoard);
