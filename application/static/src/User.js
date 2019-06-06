import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Main from './components/Main';
import JobSearch from './components/JobSearch';
import TopBar from './components/TopBar';
import UserHomepage from './components/UserHomepage';

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
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('hi');
  }

  componentDidMount() {
    let domain = window.location.hostname;
    if (domain.trim() === '127.0.0.1'.trim()) {
      domain = domain.concat(':8000');
    }
    $.ajax({
      type: 'GET',
      url: 'http://' + domain + '/api/user',
      success: (data) => {
        console.log(data);
        this.setState({
          username: data.username,
          currency: '100',
          jobsApplied: ['Apple', 'Google'],
          jobsInterested: ['Amazon'],
          levelId: 'Entry Level',
          rewards: ['Dog', 'Cat']
        });
        console.log('after state change', this.state);
      }
    });
  }

  render() {
    console.log('IN render function', this.state);
    return (
      <Router>
        <MuiThemeProvider theme={ theme }>
          <CssBaseline />
          <TopBar isLoggedIn={this.state.isLoggedIn} handleClick={this.handleClick} color={ true } /> 
            <React.Fragment>
              <Route 
                path='/user'
                render={(props) => <UserHomepage {...props} userData={ this.state } />}
              />
              <Route exact path='/jobs' component={ JobSearch } />
            </React.Fragment>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default User;
