import {
    AppBar,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'

import { AccountCircle } from '@material-ui/icons'
import { authService } from 'fbase'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    homeButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

const Navigation = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const classes = useStyles()
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const history = useHistory()
    const onLogOutClick = () => {
        authService.signOut()
        history.push('/')
    }

    return (
        <AppBar position="sticky" color="default" elevation={0}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    component={Link}
                    to="/"
                    className={classes.homeButton}
                >
                    <HomeIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.title}
                >
                    BizMeetingRoom
                </Typography>
                <div>
                    <IconButton onClick={handleMenu} to="/profile">
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={onLogOutClick}> Log Out </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}
export default Navigation
