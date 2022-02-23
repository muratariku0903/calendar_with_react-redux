import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { LocationOnOutlined } from "@material-ui/icons";


type ScheduleLocationProps = {
    location: string;
}

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
