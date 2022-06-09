import React from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Card, CardContent, CardActionArea, Typography, Theme } from '@material-ui/core';
import { Schedule } from '../../../redux/stateTypes';
import { useSearchSchedules } from '../../../hooks/search';
import { useSideMenu } from '../../../hooks/sideMenu';
import { sideMenuWidth } from '../../../constants';
import dayjs from 'dayjs';


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        board: {
            width: '100%',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            padding: '0 10vw',
        },
        boardShift: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${sideMenuWidth}px)`,
                marginLeft: `${sideMenuWidth}px`
            },
            [theme.breakpoints.down('sm')]: {
                width: `0`,
                marginLeft: `100%`
            },
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            padding: '0 10vw',
        },
        card: {
            marginTop: '3vh'
        }
    });
});

export type StateProps = {
    // user: UserState;
}

export type DispatchProps = {
    openShowScheduleDialog: (schedule: Schedule) => void;
};

export type ResultProps = StateProps & DispatchProps & {
    // openUpdateUserDialog: () => void;
};

const Result: React.FC<ResultProps> = ({ openShowScheduleDialog }) => {
    const classes = useStyles();
    const search = useLocation().search;
    const keyword = new URLSearchParams(search).get('keyword');
    const schedules = useSearchSchedules(keyword);
    const { isSideMenuOpen } = useSideMenu();

    return (
        <div className={isSideMenuOpen ? classes.boardShift : classes.board}>
            {!schedules.length ? <div>該当する項目がありませんでした</div> : schedules.map(schedule => (
                <Card key={schedule.id} className={classes.card}>
                    <CardActionArea onClick={() => openShowScheduleDialog(schedule)}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {schedule.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {dayjs.unix(schedule.date).format('YYYY/MM/DD')}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
}

export default Result;
