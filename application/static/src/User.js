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

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
    };
  }

  updateValues() {
    /* make an api call here and populate values */
  }

  componentDidMount() {
    this.updateValues()
  }

  render() {
    console.log('in user')
    return (
      <Router>
        <MuiThemeProvider theme={ theme }>
          <CssBaseline />
          <TopBar isLoggedIn={this.state.isLoggedIn} color={ true } /> 
            <React.Fragment>
              <Route exact path='/user' component={ UserHomepage } />
              <Route exact path='/jobs' component={ JobSearch } />
            </React.Fragment>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default User;
