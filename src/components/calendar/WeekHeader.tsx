import React from 'react';
import { State } from '../../redux/types';
import { connect } from 'react-redux';
import { weeks } from '../../constants';
import { GridList } from '@material-ui/core';


const WeekHeader = () => {
    return (
        <GridList cols={8}>
            {weeks.map((week, idx) => {
                return <li key={idx}>{week}</li>
            })}
        </GridList>
    );
}

export default WeekHeader;
