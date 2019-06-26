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
import getUrl from './tools/getUrl';

const styles = theme => ({
  nonList: {
    position: 'relative',
    top: '5%'
  },
  submitForm: {
    position: 'relative',
    width: '75%',
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
    marginBottom: '0',
  },
  text: {
    padding: '8%'
  },
  input: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '5rem',
  },
  secondMain: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '3rem',
  },            
  entries: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '1rem',
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
      jobsInterested: []
    }
    this.handleChangeLoc = this.handleChangeLoc.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    let url = getUrl('/api/jobs/interested');
    
    $.ajax({
      type: 'GET',
      url: url,
      success: (data) => {
        let results = JSON.parse(data);
        let interested = Object.keys(results);
        this.setState({
          jobsInterested: interested
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
    let url = getUrl('/api/job_search');
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
    let url = getUrl('/api/jobs/interested');
    let newList;
    
    if (!this.state.jobsInterested.includes(item.id)) {
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
      this.setState((prevState) => {
        const jobsInterested = prevState.jobsInterested.concat(item.id);
        return { jobsInterested };
      });
      let token = 10;
      this.props.handleToken(token);
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
      this.setState((prevState) => {
        const jobsInterested = prevState.jobsInterested.filter(element => element !== item.id);
        return { jobsInterested };
      });
    }
  }
  
  render() {
    const { classes } = this.props
    const { error, isLoaded, items } = this.state;

    return (
      <React.Fragment>
        <div className={ classes.main }> 
          <Typography gutterBottom variant="h5" component="h2" className={ classes.title }>
            Search Job Listings
          </Typography>
          <Form
            className={classes.submitForm}
          >
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
        <div className={ classes.secondMain }> 
          {this.state.viewList && this.state.isLoaded ?
            <Typography gutterBottom variant="h5" component="h2" className={ classes.title }>
              Matches
            </Typography>
            : ""}
        </div>
        <div className={ classes.entries }> 
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
                        style={ true === this.state.jobsInterested.includes(item.id) ? 
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
