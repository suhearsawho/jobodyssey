import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  test: {
    position: 'relative',
    top: '16%',
  }
});

class JobSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      job_listings: [],
      classes: props.classes
    };
  }

  // TODO: Either add a button which will change this api call
  // or make it a separate page to retrieve the list. If former
  // need to make it so theres a way to update the list?
  componentDidMount() {
    //fetch("https://jobs.github.com/positions.json?description=python&full_time=true&location=sf")
    // TODO: THIS LOGIC SHOULD BE CHANGED WHEN API UPDATED?
    let ipAddress = window.location.hostname;
    let url;
    if (ipAddress === '127.0.0.1')
    	url = 'http://' + ipAddress + ':8000/api/users';
    else
	    url = 'http://' + ipAddress + '/api/users';
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
	        this.setState({
	          isLoaded: true,
            items: result
	        });
	      },
	      (error) => {
          this.setState({
	          isLoaded: true,
	          error
	        });
	      }
      )
  }

  render() {
    const { error, isLoaded, items, classes } = this.state;
    console.log(classes.test)
    if (error) {
      console.log('IN 1')
      return (
        <React.Fragment>
          <div className={ classes.test }>Error: {error.message}</div>
        </React.Fragment>
      )
    } else if (!isLoaded) {
      return (
        <React.Fragment>
          <div className={ classes.test }>Loading... Hang Tight</div>
        </React.Fragment>
      )
    } else {
      console.log('IN 3')
      console.log(items)
      return (
        <React.Fragment>
          <div className={ classes.test }>
          <ul>
	          {Object.keys(items).map(key => (
	           <li key={key}>
	             {items[key]}
	           </li>
            ))}
          </ul>
          </div>
        </React.Fragment>
      )
    }
    return(
      <React.Fragment>
        <div className={ classes.test }>why?!</div>
      </React.Fragment>
    )
  }
  // TODO: Include a POST api request to update the database
  // with the indicated jobs when saved to jobs interested
}

export default withStyles(styles)(JobSearch);
