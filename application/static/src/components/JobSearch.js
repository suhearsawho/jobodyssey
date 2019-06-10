import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Form from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  nonList: {
    position: 'relative',
    top: '5%'
  },
  submitForm: {
    position: 'relative',
    padding: '20'
  },
  list: {
    position: 'relative',
    maxWidth: 800,
    overflow: 'auto',
    //backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
  listSection: {
    backgroundColor: 'inherit',
    padding: '5'
  },
  title: {
    paddingBottom: '2%'
  },
  text: {
    padding: '8%'
  },
  input: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexwrap: 'wrap',
  }
});

class JobSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      job_listings: [],
      favorite: null,
      searchTerms: "",
      location: "",
      viewList: false,
      jobs_interested: []
    }
    this.handleChangeLoc = this.handleChangeLoc.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    let ipAddress = window.location.hostname;
    let url;
    if (ipAddress.trim() === '127.0.0.1'.trim())
      url = 'http://' + ipAddress + ':8000/api/jobs/interested';
    else
      url = 'http://'+ ipAddress + '/api/jobs/interested';
    
    $.ajax({
      type: 'GET',
      url: url,
      success: (data) => {
        let results = JSON.parse(data);
        let interested = Object.keys(results);
        this.setState({
          jobs_interested: interested
        });
      }
    });
  }

  handleChangeLoc(event) {
    this.setState({
      location: event.target.value
    })
  }

  handleChangeSearch(event) {
    this.setState({
      searchTerms: event.target.value
    })
  }

  handleSubmit(event) {
    this.setState({
      viewList: true
    })
    let ipAddress = window.location.hostname;
    let url;
    if (ipAddress === '127.0.0.1')
      url = 'http://' + ipAddress + ':8000/api/job_search';
    else
      url = 'http://' + ipAddress + '/api/job_search';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: this.state.searchTerms,
        location: this.state.location
      })
    })
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

  jobFavorite(item) {
    if (this.state.favorite === item.id) {
      this.setState({
        favorite: null
      })
    } else {
      this.setState({
        favorite: item.id
      })
    }
    let ipAddress = window.location.hostname;
    let url;
    if (ipAddress === '127.0.0.1')
      url = 'http://' + ipAddress + ':8000/api/jobs/interested';
    else
      url = 'http://' + ipAddress + '/api/jobs/interested';
    
    if (!this.state.jobs_interested.includes(item.id)) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: item.id,
          company: item.company,
          url: item.url,
          title: item.title,
          location: item.location
        })
      });
      let newList = this.state.jobs_interested;
      newList.push(item.id)
      this.setState({
        jobs_interested: newList
      });
    }
    else {
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: item.id
        })
      });
      let newList = this.state.jobs_interested;
      newList.pop(item.id)
      this.setState({
        jobs_interested: newList
      });
    }
  }
  
  render() {
    const { classes } = this.props
    const { error, isLoaded, items } = this.state;

    return (
      <React.Fragment>
        <div className={ classes.main }> 
          <Form
            className={classes.submitForm}
          >
            <br /> <br /> <br /> <br /> <br /> < br />
            <Typography className={classes.title} variant="h2">
              Search Job Listings
                </Typography>
            <TextField
              className={classes.input}
              label="Search Terms"
              margin="normal"
              variant="outlined"
              hintText="Enter Your Search Terms"
              floatingLabelText="Search Terms"
              value={this.state.searchTerms}
              onChange={this.handleChangeSearch}
              defaultValue=""
            />
            <TextField
              className={classes.input}
              name="Location"
              label="Location"
              margin="normal"
              variant="outlined"
              hintText="Desired Location"
              floatingLabelText="Location"
              value={this.state.location}
              onChange={this.handleChangeLoc}
              defaultValue=""
            />
            <br />
            <Button
              label="Search"
              primary={true}
              margin="normal"
              variant="contained"
              onClick={this.handleSubmit}
              className={classes.input}
            >
              SEARCH
                </Button>
          </Form>
        </div>
        <div className={ classes.main }> 
          {this.state.viewList && this.state.isLoaded ?
            <Typography className={classes.title}>
              Matches
            </Typography>
            : ""}
        </div>
        <div className={ classes.main }> 
          <List className={classes.list}>
            {items.map(item => {
              return (this.state.viewList ?
                <ListItem
                  key={item}
                  className={classes.listSection}
                  role={undefined}
                  dense
                >
                  <ListItemIcon>
                    <IconButton edge="end" aria-label="Favorite">
                      <FavoriteIcon
                        className={item.id}
                        style={ true === this.state.jobs_interested.includes(item.id) ? 
                          { color: 'red' } : null } 
                        onClick={this.jobFavorite.bind(this, item)}
                      />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText
                    id={item.id}
                    primary={` ${item.company} - ${item.title} `}
                    secondary={item.location}
                  />
                  <ListItemSecondaryAction>
                    <a href={item.url} target="_blank">
                      <IconButton edge="end" aria-label="Comments">
                        <CommentIcon />
                      </IconButton>
                    </a>
                  </ListItemSecondaryAction>
                </ListItem>
                : ''
              );
            })}
          </List>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(JobSearch);
