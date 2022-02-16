import { Fragment } from 'react';
import React from 'react';
import { CalendarState, State } from './redux/types';
import { connect } from 'react-redux';
import Board from './components/calendar/Board';
import CalendarBtn from './components/calendar/CalendarBtn';

type CalendarAppProps = CalendarState;

const CalendarApp: React.FC<CalendarAppProps> = (props) => {
    return (
        <Fragment>
            <h1>カレンダー</h1>
            <h2>{props.year}年{props.month + 1}月</h2>
            <Board />
            <CalendarBtn />
        </Fragment>
    );
};

const mapStateToProps = (state: State) => {
    return {
        year: state.calendar.year,
        month: state.calendar.month,
    };
};

export default connect(mapStateToProps)(CalendarApp);

