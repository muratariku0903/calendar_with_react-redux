import React from 'react';
import { Typography } from '@material-ui/core';


type OutterProps = {
    errorMessage: string;
}

type ErrorMessageProps = OutterProps;

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => {
    return (
        <div>
            <Typography variant="caption" component="div" color="error">{errorMessage}</Typography>
        </div>
    );
};

export default ErrorMessage;


