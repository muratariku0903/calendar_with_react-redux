import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import { makeStyles, createStyles, Theme, alpha } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            marginRight: '20px',
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `1em`,
            paddingRight: `1em`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
        iconButton: {
            padding: 10,
        },
    });
});


type OutterProps = {
}

type ScheduleSearchBarProps = OutterProps;

const ScheduleSearchBar: React.FC<ScheduleSearchBarProps> = ({ }) => {
    const classes = useStyles();
    const navigation = useNavigate();
    const [keyword, setKeyword] = useState<string>('');

    const goToSearchPage = (keyword: string): void => {
        if (keyword.trim() === '') return;
        
        navigation({
            pathname: '/search',
            search: `?keyword=${keyword}`,
        });
    }

    return (
        <div className={classes.search}>
            <InputBase
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="予定を検索"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton
                onClick={() => goToSearchPage(keyword)}
                type="submit"
                className={classes.iconButton}
                aria-label="search">
                <SearchIcon />
            </IconButton>
        </div>
    );
}

export default ScheduleSearchBar;
