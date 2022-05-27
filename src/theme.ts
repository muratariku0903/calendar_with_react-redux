import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';
import { createTheme } from '@material-ui/core/styles';


type overridesNameToClassKey = {
    [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

type CustomType = {
    MuiPickersBasePicker: {
        pickerView: {
            maxWidth?: string;
        };
    };
};

declare module '@material-ui/core/styles/overrides' {
    interface ComponentNameToClassKey extends overridesNameToClassKey { }
    export interface ComponentNameToClassKey extends CustomType { }
}

export const theme = createTheme({
    overrides: {
        MuiPickersBasePicker: {
            pickerView: {
                margin: '0 auto'
            },
        },
    }
});
