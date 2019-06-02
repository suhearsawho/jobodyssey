import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Main from './components/Main'
import JobSearch from './components/JobSearch'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#f9d585"
    },
    primary: {
      main: "#c6ffdd"
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
          <p> Place common elements here </p>
          
          <Route exact path='/' component={ Main } />
          <Route exact path='/jobs' component = { JobSearch } />
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
