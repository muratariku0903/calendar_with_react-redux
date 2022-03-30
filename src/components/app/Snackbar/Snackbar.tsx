import React from 'react';
import { Snackbar, IconButton} from '@material-ui/core';
import { Close, Error, Check } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { SnackBarState } from '../../../redux/stateTypes';


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
    snackBar: SnackBarState;
};

export type DispatchProps = {
    close: () => void;
};

export type ErrorSnackbarProps = StateProps & DispatchProps;

const SnackBar: React.FC<ErrorSnackbarProps> = ({ snackBar: { isOpenSnackBar, type, message }, close }) => {
    const classes = useStyles();
    const iconClass = [classes.icon, classes.iconVariant].join(" ");
    const createIcon = () => {
        switch (type) {
            case 'success':
                return <Check style={{ color: 'green' }} className={iconClass} />;
            case 'error':
                return <Error color='error' className={iconClass} />;
            default:
                return;
        }
    }
    return (
        <Snackbar
            open={isOpenSnackBar}
            onClose={close}
            autoHideDuration={6000}
            message={
                <span className={classes.message}>
                    {createIcon()}
                    {message}
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

export default SnackBar;

