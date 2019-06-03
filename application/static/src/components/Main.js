import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    background: 'linear-gradient(to right bottom, #8a2387, #e94057, #f27121)',
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem",
    [theme.breakpoints.up('sm')]: {
      padding: "1rem"
    },
    color: "white",
  },
  opening: {
    paddingLeft: "1rem",
    [theme.breakpoints.up('sm')]: {
      paddingLeft: "4rem"
    },
    position: "absolute",
    top: "35%",
  },
  warning: {
    paddingLeft: "1rem",
    [theme.breakpoints.up('sm')]: {
      paddingLeft: "4rem"
    },
    position: "absolute",
    bottom: "15%",
  },
  title: {
    fontWeight: 400,
  },
  buttonContainer: {
    paddingLeft: "1rem",
    [theme.breakpoints.up('sm')]: {
      paddingLeft: "4rem"
    },
    position: "absolute",
    top: "55%"
  },
  button: {
    color: "rgba(255, 255, 255, 1)",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    padding: "10px 16px"
  }
});

class Main extends Component {
  
  render() {
    const { classes } = this.props;
    console.log(this.props); 
    return (
      <React.Fragment>
        <div className={ classes.main }>
          <div className={ classes.opening }>
            <h3 className={ classes.title }>
              Gamify Your Job Search Here:
            </h3>
            <h1 className={ classes.title }>
              jobsomething
            </h1>
          </div>
          <div className={ classes.buttonContainer }>
            <Button variant="outlined" className={ classes.button }>
              Login with Github
            </Button>
          </div>
        </div>
      </React.Fragment> 
    )
  }
}

export default withStyles(styles)(Main);
