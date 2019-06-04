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
      contrastText: "white"
    }
  },
  typography: {
  	fontFamily: "Nunito Sans, Roboto, sans-serif"
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.handleOAuth = this.handleOAuth.bind(this);
  }

  handleOAuth() {
    let ipAddress = window.location.hostname;
    let url = 'http://' + ipAddress + ':8000/login';
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      success: function(data, textStatus) {
        console.log('DATA REDIRECT STATUS', data.redirect);
        if (data.redirect) {
          window.location.href = data.redirect;
        }
      }
    });
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={ theme }>
          <CssBaseline />
          <TopBar isLoggedIn={ false } color={ false } /> 
            <React.Fragment>
              <Route 
                exact path='/' 
                render={ (props) => <Main {...props} handleOAuth= { this.handleOAuth } />} 
              />
            </React.Fragment>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
