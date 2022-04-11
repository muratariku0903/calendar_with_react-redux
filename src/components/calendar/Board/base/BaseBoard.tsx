import React, { ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { GridList } from '@material-ui/core';
import { SideMenuState } from '../../../../redux/stateTypes';
import { sideMenuWidth } from '../../../../constants';


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        grid: {
            borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        },
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
                <GridList className={classes.grid} cols={7} spacing={0} cellHeight="auto">
                    {children}
                </GridList>
            </div>
        </DndProvider>
    );
}

export default BaseBoard;
