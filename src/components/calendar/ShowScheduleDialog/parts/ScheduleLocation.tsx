import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { LocationOnOutlined } from "@material-ui/icons";
import { Schedule } from '../../../../redux/stateTypes';


type ScheduleLocationProps = Pick<Schedule, 'location'>;

const ScheduleLocation: React.FC<ScheduleLocationProps> = ({ location }) => {
    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <LocationOnOutlined />
            </Grid>
            <Grid item xs={10}>
                <Typography>{location}</Typography>
            </Grid>
        </Grid>
    );
}

export default ScheduleLocation;
