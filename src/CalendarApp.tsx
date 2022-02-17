import { Fragment } from 'react';
import React from 'react';
import { CalendarState, State } from './redux/types';
import { connect } from 'react-redux';
import Board from './components/calendar/Board/Board';
import CalendarBtn from './components/calendar/CalendarBtn';
import Navigation from './components/calendar/Navigation/container';

type CalendarAppProps = CalendarState;

const CalendarApp: React.FC<CalendarAppProps> = (props) => {
    return (
        <Fragment>
            <Navigation />
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

