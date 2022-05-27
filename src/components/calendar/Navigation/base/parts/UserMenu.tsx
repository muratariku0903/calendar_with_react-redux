import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from "@material-ui/icons";
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
    return createStyles({
        userMenu: {
            marginRight: '10px',
            display: 'flex',
            alignItems: 'center',
        },
    });
});

type OutterProps = {
}

type UserProps = OutterProps;

const UserMenu: React.FC<UserProps> = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    return (
        <div className={classes.userMenu}>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <AccountCircle style={{ marginRight: '5px', color: 'white' }} />
            </IconButton>
            <Menu open={open} onClose={() => setAnchorEl(null)} anchorEl={anchorEl}>
                <MenuItem onClick={() => navigate('user')}>プロフィール</MenuItem>
            </Menu>
        </div>
    );
}

export default UserMenu;
