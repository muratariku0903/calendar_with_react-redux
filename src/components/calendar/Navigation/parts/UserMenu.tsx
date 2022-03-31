import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Button, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { UserState } from '../../../../redux/stateTypes';

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        userMenu: {
            marginRight: '10px',
            display: 'flex',
            alignItems: 'center',
        },
    });
});

type OutterProps = {
    user: UserState;
    logout: () => void;
}

type UserProps = OutterProps;

const UserMenu: React.FC<UserProps> = ({ user, logout }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    return (
        <Fragment>
            {user.isLogin && (
                <div className={classes.userMenu}>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <AccountCircle style={{ marginRight: '5px', color: 'white' }} />
                    </IconButton>
                    <Menu open={open} onClose={() => setAnchorEl(null)} anchorEl={anchorEl}>
                        <MenuItem onClick={() => navigate('user')}>プロフィール</MenuItem>
                    </Menu>
                    <Button color="inherit" onClick={logout}>ログアウト</Button>
                </div>
            )}
        </Fragment>
    );
}

export default UserMenu;
