import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import GroupIcon from '@material-ui/icons/Group';
import Hidden from '@material-ui/core/Hidden';
import HistoryIcon from '@material-ui/icons/History';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 0,
      flexShrink: 0,
    }, 
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  linkStyle: {
    textDecoration: 'none'
  }
}));


function ResponsiveDrawer(props) {
  const { handleClick, container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const jobKeys = ['Job Search', 'Saved Jobs', 'Job History'];
  const userKeys = ['Home', 'Community', 'Challenge Mode'];
  
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={ classes.toolbar } />
      <Divider />
      <List>
        <Link to='/user' className={ classes.linkStyle }>
          <ListItem button key={ userKeys[0] }>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={ userKeys[0] } />
          </ListItem>
        </Link>
        <ListItem button key={ userKeys[1] }>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary={ userKeys[1] } />
        </ListItem>
        <ListItem button key={ userKeys[2] }>
          <ListItemIcon>
            <PlayCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary={ userKeys[2] } />
        </ListItem>
      </List>
      <Divider />
      <List>
        <Link to='/jobs' className={ classes.linkStyle }>
          <ListItem button key={ jobKeys[0] }>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={ jobKeys[0] } />
          </ListItem>
        </Link>
        <ListItem button key={ jobKeys[1] }>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={ jobKeys[1] } />
        </ListItem>
        <ListItem button key={ jobKeys[2] }>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary={ jobKeys[2] } />
        </ListItem>
      </List>
    </div>
  );

	return (
		<React.Fragment>
			<IconButton
				color="inherit"
				aria-label="Open drawer"
				edge="start"
				onClick={handleDrawerToggle}
				className={classes.menuButton}
			>
				<MenuIcon />
    	</IconButton>
		    <nav className={classes.drawer} aria-label="Links">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onClick={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
		</React.Fragment>
	);
}

export default ResponsiveDrawer;	
