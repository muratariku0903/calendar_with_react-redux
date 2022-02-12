import React from 'react';
import { State } from '../../redux/types';
import { connect } from 'react-redux';
import { getCalendarCells, CalendarCell } from '../../redux/selectors';
import { weeks } from '../../constants';


const WeekHeader = () => {
    return (
        <thead>
            <tr>
                {weeks.map((week, idx) => {
                    return <th key={idx}>{week}</th>
                })}
            </tr>
        </thead>
    );
}

export default WeekHeader;
