import React from 'react';
import { Oval } from 'react-loader-spinner';
import { Backdrop } from '@material-ui/core';
import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => {
    return createStyles({
        loader: {
            zIndex: 10000,
        },
    });
});

export type StateProps = {
    isOpenLoader: boolean;
}

export type CalendarLoaderProps = StateProps;

const CalendarLoader: React.FC<CalendarLoaderProps> = ({ isOpenLoader }) => {
    const classes = useStyles();
    return (
        <Backdrop open={isOpenLoader} className={classes.loader}>
            <Oval
                ariaLabel="loading-indicator"
                height={100}
                width={100}
                strokeWidth={5}
                strokeWidthSecondary={1}
                color="rgb(121, 134, 203)"
                secondaryColor="white"
            />
        </Backdrop>
    );
};


export default CalendarLoader;
