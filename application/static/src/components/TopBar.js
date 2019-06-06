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
    backgroundImage: "linear-gradient(to right bottom, #8a2387, #e94057, #f27121)",
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

export default function TopBar({ isLoggedIn, handleClick, color }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(event) {
    console.log(event);
    setAnchorEl(null);
  }

  return (
      <AppBar position="fixed" className={ color ? classes.color: classes.noColor }>
        <Toolbar>
          { isLoggedIn && (
            <ResponsiveDrawer handleClick={ handleClick }/>
          )}
          <Typography variant="h6" className={ classes.title }>
            jobodyssey
          </Typography>
          <div className={ classes.info }>
            { isLoggedIn && (
              <React.Fragment>
                <IconButton
                  aria-label="Account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={ handleMenu }
                >
                  <AccountCircle />
                </IconButton>
							 	<Menu
									id="menu-appbar"
									anchorEl={ anchorEl }
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={ open }
									onClose={ handleClose }
								>
									<MenuItem onClick={ handleClose }>My Account</MenuItem>
									<MenuItem onClick={ handleClose }>Logout</MenuItem>
								</Menu> 
              </React.Fragment>
              )
            }
            { !isLoggedIn && (
              <Button className={ classes.button }>
                Learn More
              </Button>
              )
            }
          </div>
        </Toolbar>
      </AppBar>
  )
};
