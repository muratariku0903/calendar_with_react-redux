import React from 'react';
import BaseNavigation from '../base/containers/BaseNavigation';


export type StateProps = {
    // year: CalendarState['year'];
    // month: CalendarState['month'];
    // isSideMenuOpen: SideMenuState['isOpen'];
    // user: UserState;
}

export type DispatchProps = {
    // setMonth: (year: number, month: number) => void;
    // sideMenuOpen: () => void;
    // logout: () => void;
}

export type WeekNavigationProps = StateProps & DispatchProps & {
    // setPrevMonth: () => void;
    // setNextMonth: () => void;
}

const WeekNavigation: React.FC<WeekNavigationProps> = ({ }) => {
    return (
        <BaseNavigation>
            hello
        </BaseNavigation>
    );
}

export default WeekNavigation;
