import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import ResponsiveDrawer from './ResponsiveDrawer';

const useStyles = makeStyles(theme => ({
  noColor: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    boxShadow: "none",
    [theme.breakpoints.down('sm')]: {
      flexWrap: "wrap",
    }
  },
  color: {
    backgroundImage: theme.palette.primary.mainGradient,
  },
  title: {
    fontWeight: 400
  },
  info: {
    position: "absolute",
    right: "2%",
  },
  button: {
    color: "white",
  }
}));

export default function TopBar({ isLoggedIn, handleLogout, color }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function callLogout() {
    setAnchorEl(null);
    handleLogout();
  }

  return (
    <AppBar position="fixed" className={color ? classes.color : classes.noColor}>
      <Toolbar>
        {isLoggedIn && (
          <ResponsiveDrawer />
        )}
        <Typography variant="h6" className={classes.title}>
          Job Odyssey
          </Typography>
        <div className={classes.info}>
          {isLoggedIn && (
            <React.Fragment>
              <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}
              >
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
                <Link to="/user/account">
                <MenuItem onClick={handleClose}>My Account</MenuItem>
                </Link>
                <MenuItem onClick={callLogout}>
                  Logout
                  </MenuItem>
              </Menu>
            </React.Fragment>
          )
          }
          {!isLoggedIn && (
            <Button className={classes.button}>
              Learn More
              </Button>
          )
          }
        </div>
      </Toolbar>
    </AppBar>
  )
};
