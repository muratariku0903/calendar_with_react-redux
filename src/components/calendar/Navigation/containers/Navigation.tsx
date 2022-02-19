import Navigation from "../Navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../../../redux/stateTypes";
import { setMonth } from '../../../../redux/actions/calendar';

const mapStateToProps = (store: State) => {
    return {
        currentYear: store.calendar.year,
        currentMonth: store.calendar.month,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setMonth: (year: number, month: number) => dispatch(setMonth(year, month)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);