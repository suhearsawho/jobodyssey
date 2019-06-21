import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Main from './components/Main';
import JobSearch from './components/JobSearch';
import TopBar from './components/TopBar';
import UserHomepage from './components/UserHomepage';
import JobsAppliedForm from './components/JobsAppliedForm';
import JobsAppliedHistory from './components/JobsAppliedHistory';
import Rewards from './components/Rewards';
import TokenMessage from './components/TokenMessage';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withStyles } from '@material-ui/core';
import ComingSoon from './components/ComingSoon';
import NoMatch from './components/NoMatch';
import TableHistory from './components/TableHistory';
import VerticalHistory from './components/VerticalHistory';
import getUrl from './components/tools/getUrl';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#8a2387",
      contrastText: "white"
    },
    primary: {
      main: "#e94057",
      contrastText: "white",
    }
  },
  typography: {
  	fontFamily: "Nunito Sans, Roboto, sans-serif"
  }
});

const styles = theme => ({
  root: {
    backgroundColor: 'green',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
});

class User extends Component {
  constructor(props) {
    super(props);
    console.log("in the constructor")
    this.state = {
      isLoggedIn: true,
      username: '',
      currency: '',
      jobsApplied: [],
      jobsInterested: [],
      title: 'Entry Level Software Engineer',
      rewards: [],
      profilePicture: '',
      bio: '',
      Transition: Slide,
      open: false,
      token: 0,
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
 
  handleClick(value, message) {
    console.log('handle click!');
    if (message === undefined || message === null)
      message = ''
    this.setState({
      open: true,
      token: value,
      message: message, 
    });
  };

  handleClose() {
    console.log("in close");
    this.setState({
      open: false,
    });
  }

  handleLogout() {
    let url = getUrl('/user/logout');
    $.ajax({
      type: 'GET',
      url: url,
      success: (data) => {
        if (data.redirect)
          window.location.href = data.redirect;
      }
    });
  }
  componentDidMount() {
    let url = getUrl('/api/user');
    $.ajax({
      type: 'GET',
      url: url,
      success: (data) => {
        console.log(data);
        this.setState({
          username: data.user_name,
          currency: data.currency,
          jobsApplied: data.jobs_applied,
          jobsInterested: data.jobs_interested,
          levelId: 'Entry Level',
          rewards: data.rewards,
        });
        $.ajax({
          type: 'GET',
          url: 'https://api.github.com/users/' + this.state.username,
          success: (data) => {
            console.log(data);
            this.setState({
              profilePicture: data.avatar_url,
              bio: data.bio
            });
          }
        });
      }
    });
  }

  render() {
    const { open, Transition, token, message } = this.state;
    const { classes } = this.props;

    return (
      <Router>
        <MuiThemeProvider theme={ theme }>
          <CssBaseline />
          <TopBar isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} color={ true } />
          <div>
            <Snackbar
              open={ open }
              autoHideDuration={ 3000 }
              onClose={ () => this.handleClose() }
              TransitionComponent={ Transition }
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={
                <span id="client-snackbar" className={classes.message}>
                  <CheckCircleIcon className={ classes.icon, classes.iconVariant } />
                  You Earned { token } Coins! { message }
                </span>
              }
            />
        </div>
            <React.Fragment>
              <Switch>
              <Route 
                exact path='/user'
                render={(props) => <UserHomepage {...props} userData={ this.state } />}
              />
              <Route
                exact path='/jobs'
                render={(props) => <JobSearch {...props} handleToken={ this.handleClick }/>}
              />
              <Route 
                exact path='/jobs/appliedform'
                render={(props) => <JobsAppliedForm {...props} handleToken={ this.handleClick }/>}
              />
              <Route
                exact path='/jobs/appliedhistory'
                render={(props) => <JobsAppliedHistory {...props} handleToken={ this.handleClick }/>}
              />
              <Route
                exact path='/jobs/appliedhistorytable'
                render={(props) => <TableHistory {...props} handleToken={ this.handleClick }/>}
              />
              <Route
                exact path='/jobs/appliedhistoryvertical'
                render={(props) => <VerticalHistory {...props} handleToken={ this.handleClick }/>}
              />
              <Route exact path='/rewards' component={ Rewards } />
              <Route exact path='/jobs/saved' component={ ComingSoon } />
              <Route exact path='/user/community' component={ ComingSoon } />
              <Route component={ NoMatch } />
              </Switch>
            </React.Fragment>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default withStyles(styles)(User);
