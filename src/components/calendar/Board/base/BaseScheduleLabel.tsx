import React, { ReactNode } from 'react';
import { useDrag } from 'react-dnd';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { Schedule } from '../../../../redux/stateTypes';
import { DndItems } from '../dnd/constants';


export type DispatchProps = {
    openShowDialog: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, schedule: Schedule) => void;
}

export type OutterProps = {
    schedule: Schedule;
    classes: ClassNameMap<'schedule'>;
}

type ChildrenProps = {
    children: ReactNode;
}

export type BaseScheduleLabelProps = DispatchProps & OutterProps & ChildrenProps;

const BaseScheduleLabel: React.FC<BaseScheduleLabelProps> = ({ schedule, openShowDialog, classes, children }) => {
    const [collected, drag] = useDrag(() => ({
        type: DndItems.Schedule,
        item: schedule,
    }), [schedule]);

    return (
        <div
            ref={drag}
            onClick={e => openShowDialog(e, schedule)}
            className={classes.schedule}
        >
            {children}
        </div>
    );
}

export default BaseScheduleLabel;
