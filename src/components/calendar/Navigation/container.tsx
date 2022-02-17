import Navigation from "./Navigation";
import { connect } from "react-redux";
import { State } from "../../../redux/types";
import { Dispatch } from "redux";
import { setMonth } from '../../../redux/actions';
import { Dayjs } from 'dayjs';
import { getYearMonthFromDayjsObj } from "../../../services/calendar";

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
