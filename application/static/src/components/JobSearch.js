import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  nonList: {
    position: 'relative',
    top: '16%',
  },
  list: {
    flex: '1',
    width: '100%',
    height: '100%',
    position: 'relative',
    top: '20%'
  }
});

class JobSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      job_listings: []
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
    	url = 'http://' + ipAddress + ':8000/api/job_search';
    else
	    url = 'http://' + ipAddress + '/api/job_search';
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
	        this.setState({
	          isLoaded: true,
            items: result.items
	        });
	      },
	      (error) => {
          console.log(res)
          this.setState({
	          isLoaded: true,
	          error
	        });
	      }
      )
  }

  render() {
    const { classes } = this.props
    const { error, isLoaded, items } = this.state;
    if (error) {
      console.log('IN 1')
      return (
        <div className={ classes.nonList }>Error: {error.message}</div>
      )
    } else if (!isLoaded) {
      return (
        <div className={ classes.nonList }>Loading... Hang Tight</div>
      )
    } else {
      console.log('IN 3')
      console.log(items)
      return (
        <React.Fragment>
        <div className={ classes.list }>
          <ul>
            {items.map(item => (
              <li key={ item.id }>
                { item.company } - { item.title }
                <ul>
                  <li>{ item.location }</li> 
                  <li><a href={ item.url }>{ item.url }</a></li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
        </React.Fragment>
      )
    }
  }
  // TODO: Include a POST api request to update the database
  // with the indicated jobs when saved to jobs interested
}

export default withStyles(styles)(JobSearch);
