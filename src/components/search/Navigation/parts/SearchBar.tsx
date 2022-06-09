import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Paper, InputBase } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        paper: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '25%',
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
    });
});


type OutterProps = {
}

type SearchBarProps = OutterProps;

const SearchBar: React.FC<SearchBarProps> = ({ }) => {
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
        <Paper className={classes.paper}>
            <InputBase
                onChange={(e) => setKeyword(e.target.value)}
                className={classes.input}
                placeholder="予定を検索"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton
                onClick={() => goToSearchPage(keyword)}
                type="submit"
                className={classes.iconButton}
                aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

export default SearchBar;
