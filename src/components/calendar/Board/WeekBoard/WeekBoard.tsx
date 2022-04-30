import React from 'react';
import { GridList, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core';
import { CalendarDate } from '../../../../redux/selectors';
import BaseBoard from '../base/containers/BaseBoard';
import WeekHeader from '../base/WeekHeader';
import TimeTable from './parts/TImeTable';
import SideTimeLabels from './parts/SideTimeLabels';


const useStyles = makeStyles(() => {
    return createStyles({
        grid: {
            borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        },
    });
});

export type StateProps = {
    dates: CalendarDate[];
}

export type WeekBoardProps = StateProps;


const WeekBoard: React.FC<WeekBoardProps> = ({ dates }) => {
    const classes = useStyles();
    return (
        <BaseBoard>
            <Grid container>
                <Grid item xs={1}>
                    <SideTimeLabels />
                </Grid>
                <Grid item xs={11}>
                    <GridList className={classes.grid} cols={7} spacing={0} cellHeight="auto">
                        {WeekHeader()}
                        {TimeTable(dates)}
                    </GridList>
                </Grid>
            </Grid>
        </BaseBoard>
    );
}

export default WeekBoard;
