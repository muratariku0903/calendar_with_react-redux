import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';
import { createTheme } from '@material-ui/core/styles';
import { sideMenuWidth } from '../../../constants';


type overridesNameToClassKey = {
    [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

type CustomType = {
    MuiPickersStaticWrapper: {
        staticWrapperRoot: {
            minWidth?: string;
        }
    };
    MuiPickersBasePicker: {
        pickerView: {
            maxWidth?: string;
        };
    };
    MuiPickersDay: {
        day: {
            width?: string;
            height?: string;
        }
    }
};

declare module '@material-ui/core/styles/overrides' {
    interface ComponentNameToClassKey extends overridesNameToClassKey { }
    export interface ComponentNameToClassKey extends CustomType { }
}

export const customPickerTheme = createTheme({
    overrides: {
        MuiPickersStaticWrapper: {
            staticWrapperRoot: {
                minWidth: `${sideMenuWidth}px`,
            }
        },
        MuiPickersBasePicker: {
            pickerView: {
                maxWidth: `${sideMenuWidth}px`,
                minWidth: `${sideMenuWidth}px`,
            },
        },
        MuiPickersDay: {
            day: {
                width: `${sideMenuWidth / 8}px`,
                height: `${sideMenuWidth / 8}px`,
            }
        }
    }
});
