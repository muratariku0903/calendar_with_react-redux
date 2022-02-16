import React from 'react';
import { State } from '../../redux/types';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import { Dispatch } from 'redux';
import { setMonth, CalendarActions } from '../../redux/actions';
import { useState } from 'react';
import { months } from '../../constants';


type CalendarBtn = {
    currentYear: number;
    currentMonth: number;
    setMonth: (year: number, month: number) => CalendarActions;
}


const CalendarBtn: React.FC<CalendarBtn> = (props) => {
    const [selectedMonth, setSelectedMonth] = useState<number>(props.currentMonth);

    const onClickPrev = () => {
        let newYear = props.currentYear;
        let newMonth = props.currentMonth;
        if (newMonth === 0) {
            newYear--;
            newMonth = 11;
        } else {
            newMonth--;
        }
        props.setMonth(newYear, newMonth);
    }

    const onClickNext = () => {
        let newYear = props.currentYear;
        let newMonth = props.currentMonth;
        if (newMonth === 11) {
            newYear++;
            newMonth = 0;
        } else {
            newMonth++;
        }
        props.setMonth(newYear, newMonth);
    }

    const onChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(Number(e.target.value));
    }

    const onClickSetMonth = () => {
        props.setMonth(props.currentYear, selectedMonth);
    }

    return (
        <Fragment>
            <button onClick={onClickPrev}>前月</button>
            <button onClick={onClickNext}>次月</button>
            <select onChange={onChangeMonth}>
                {months.map((month, idx) => {
                    return <option key={idx} value={month - 1}>{month}</option>
                })}
            </select>
            <button onClick={onClickSetMonth}>決定</button>
        </Fragment>
    );
}

const mapStateToProps = (state: State) => {
    return {
        currentYear: state.calendar.year,
        currentMonth: state.calendar.month
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setMonth: (year: number, month: number) => dispatch(setMonth(year, month)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarBtn);
