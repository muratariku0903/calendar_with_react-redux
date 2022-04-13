import React, { ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { SideMenuState } from '../../../../redux/stateTypes';
import { sideMenuWidth } from '../../../../constants';


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        board: {
            width: '100%',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        boardShift: {
            width: `calc(100% - ${sideMenuWidth}px)`,
            marginLeft: sideMenuWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
    });
});

export type StateProps = {
    isSideMenuOpen: SideMenuState['isOpen'];
}

export type ChildrenProps = {
    children: ReactNode;
}

export type BaseBoardProps = StateProps & ChildrenProps;

const BaseBoard: React.FC<BaseBoardProps> = ({ isSideMenuOpen, children }) => {
    const classes = useStyles();
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={isSideMenuOpen ? classes.boardShift : classes.board}>
                {children}
            </div>
        </DndProvider>
    );
}

export default BaseBoard;
