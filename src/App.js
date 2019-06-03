import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

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
    this.state = {
      isLoggedIn: true,
    };
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={ theme }>
          <CssBaseline />
          <TopBar isLoggedIn={this.state.isLoggedIn} /> 
          { this.state.isLoggedIn && (
              <React.Fragment>
                <Route exact path='/' component={ UserHomepage } />
                <Route exact path='/jobs' component={ JobSearch } />
              </React.Fragment>
            )
          }
          { !this.state.isLoggedIn && (  
              <React.Fragment>
                <Route exact path='/' component={ Main } />
                <Route 
                  exact path='/jobs' 
                  render={ (props) => <Main {...props} redirect={ true } /> } 
                />
              </React.Fragment>
            )
          }
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
