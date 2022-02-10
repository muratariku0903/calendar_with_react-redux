import React from 'react';
import { State } from '../../redux/types';
import { connect } from 'react-redux';
import { getCalendarCells, CalendarCell } from '../../redux/selectors';


type CellProps = {
    date: CalendarCell;
    currentDay: number;
}

const Cell: React.FC<CellProps> = (props) => {
    const cellStyle = {
        normal: {
            color: 'black'
        },
        current: {
            color: 'blue',
            fontWeight: 'bold',
        }
    }

    const setStyle = () => {
        // ひちにだけじゃなくて、月と都市も確認しないと
        return props.date === props.currentDay ? cellStyle.current : cellStyle.normal;
    }

    return (
        <td style={setStyle()}> {props.date}</td >
    );
}

const mapStateToProps = (state: State) => {
    return {
        currentDay: state.calendar.currentDay,
    };
}

export default connect(mapStateToProps)(Cell);
