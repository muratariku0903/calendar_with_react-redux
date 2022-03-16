import { weeks } from '../../../constants';
import { GridList, Typography } from '@material-ui/core';


const WeekHeader = () => {
    return (
        <GridList cols={7} cellHeight="auto" spacing={0}>
            {weeks.map((week, idx) => {
                return (
                    <li key={idx}>
                        <Typography align="center" component="div" variant="caption" color="textSecondary">
                            {week}
                        </Typography>
                    </li>
                )
            })}
        </GridList>
    );
}

export default WeekHeader;
