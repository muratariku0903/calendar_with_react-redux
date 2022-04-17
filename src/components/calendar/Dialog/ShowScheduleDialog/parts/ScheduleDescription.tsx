import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { NotesOutlined } from "@material-ui/icons";
import { Schedule } from '../../../../../redux/stateTypes';


type ScheduleDescriptionProps = Pick<Schedule, 'description'>;

const ScheduleDescription: React.FC<ScheduleDescriptionProps> = ({ description }) => {
    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <NotesOutlined />
            </Grid>
            <Grid item xs={10}>
                <Typography>{description}</Typography>
            </Grid>
        </Grid>
    );
}

export default ScheduleDescription;
