import React, { ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useMediaQuery } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { SideMenuState } from '../../../../redux/stateTypes';
import { sideMenuWidth, breakpoints } from '../../../../constants';

type BaseBoardStyleProps = {
    boardWidth?: string;
    boardShiftWidth: string;
    boardShiftMarginLeft: string;
}

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
            width: (props: BaseBoardStyleProps) => props.boardShiftWidth,
            marginLeft: (props: BaseBoardStyleProps) => props.boardShiftMarginLeft,
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
    const isSizeXS = useMediaQuery(`(max-width:${breakpoints.xs}px)`);
    const boardShiftWidth = isSizeXS ? '0' : `calc(100% - ${sideMenuWidth}px)`;
    const boardShiftMarginLeft = isSizeXS ? '100%' : `${sideMenuWidth}px`;
    const classes = useStyles({ boardShiftWidth, boardShiftMarginLeft });
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={isSideMenuOpen ? classes.boardShift : classes.board}>
                {children}
            </div>
        </DndProvider>
    );
}

export default BaseBoard;
