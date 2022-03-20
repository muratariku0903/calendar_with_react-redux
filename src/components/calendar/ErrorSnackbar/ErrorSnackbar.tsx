import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import { Close, Warning } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { SchedulesState } from '../../../redux/stateTypes';


const useStyles = makeStyles(theme => ({
    message: {
        display: "flex",
        alignItems: "center"
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: 10,
    }
}));

export type StateProps = {
    error: SchedulesState['error'];
}

export type DispatchProps = {
    close: () => void;
}

export type ErrorSnackbarProps = StateProps & DispatchProps;

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ error, close }) => {
    const classes = useStyles();
    return (
        <Snackbar
            open={!!error}
            onClose={close}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            message={
                <span className={classes.message}>
                    <Warning className={[classes.icon, classes.iconVariant].join(" ")} />
                    {error}
                </span>
            }
            action={
                <IconButton color='inherit' onClick={close}>
                    <Close className={classes.icon} />
                </IconButton>
            }
        />
    );
}

export default ErrorSnackbar;
