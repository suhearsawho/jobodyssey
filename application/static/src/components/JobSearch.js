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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
  }
});

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

class JobSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      job_listings: [],
      favorite: null,
      searchTerms: "",
      location: "",
      viewList: false
    }
    this.handleChangeLoc = this.handleChangeLoc.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  }

  favoriteColor(item) {
    if (this.state.favorite === item.id) {
      return "red";
    }
    return "";
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
      return (
        <div className={classes.nonList}>Error: {error.message}</div>
      )
    } else if (!isLoaded) {
      return (
        <div className={classes.nonList}>Loading... Hang Tight</div>
      )
    } else {
      return (
        <MuiThemeProvider theme={theme}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.state.viewList ?
            <Typography className={classes.title}>
              Matches
            </Typography>
            : ""}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
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
                          style={{ color: this.favoriteColor(item) }}
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
        </MuiThemeProvider>
      )
    }
  }
  // TODO: Include a POST api request to update the database
  // with the indicated jobs when saved to jobs interested
}

export default withStyles(styles)(JobSearch);
