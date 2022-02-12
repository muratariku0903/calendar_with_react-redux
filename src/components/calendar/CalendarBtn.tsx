import React from 'react';
import { State } from '../../redux/types';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import { Dispatch } from 'redux';
import { nextCalendar, prevCalendar, setMonth, CalendarActions } from '../../redux/actions';
import { useState } from 'react';
import { months } from '../../constants';


type CalendarBtn = {
    currentMonth: number;
    prevCalendar: () => CalendarActions;
    nextCalendar: () => CalendarActions;
    setMonth: (month: number) => CalendarActions;
}


const CalendarBtn: React.FC<CalendarBtn> = (props) => {
    const [selectedMonth, setSelectedMonth] = useState<number>(props.currentMonth);

    const onClickPrev = () => {
        props.prevCalendar();
    }

    const onClickNext = () => {
        props.nextCalendar();
    }

    const onChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(Number(e.target.value));
    }

    const onClickSetMonth = () => {
        console.log(selectedMonth);
        props.setMonth(selectedMonth);
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
        currentMonth: state.calendar.month
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        prevCalendar: () => dispatch(prevCalendar()),
        nextCalendar: () => dispatch(nextCalendar()),
        setMonth: (month: number) => dispatch(setMonth(month)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarBtn);
