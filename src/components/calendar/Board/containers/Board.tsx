import Board from '../Board';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '../../../../redux/types';
import { getCalendarDates } from '../../../../redux/selectors';

const mapStateToProps = (state: State) => {
    return {
        month: state.calendar.month,
        dates: getCalendarDates(state),
    };
}

export default connect(mapStateToProps)(Board);
