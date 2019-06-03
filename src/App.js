import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Main from './components/Main'
import JobSearch from './components/JobSearch'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#8a2387"
    },
    primary: {
      main: "#e94057"
    }
  },
  typography: {
  	fontFamily: "Nunito Sans, Roboto, sans-serif"
  }
});

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={ theme }>
          <CssBaseline />
          
          <Route exact path='/' component={ Main } />
          <Route exact path='/jobs' component = { JobSearch } />
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
