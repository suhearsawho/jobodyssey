import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
  },
 	expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class AppliedJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsApplied: {},
			expanded: false,
    };
		this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleSpreadsheet = this.handleSpreadsheet.bind(this);
  }

  componentDidMount() {
    let ipAddress = window.location.hostname;
    let url;
    console.log('in appliedjobs mount function');
    if (ipAddress.trim() === '127.0.0.1'.trim())
      url = 'http://' + ipAddress + ':8000/api/jobs/applied';
    else
      url = 'http://'+ ipAddress + '/api/jobs/applied';
    $.ajax({
      type: 'GET',
      url: url,
      success: (data) => {
        let results = JSON.parse(data);
        console.log(results);
        this.setState({
          jobsApplied: results
        });
      }
    });
  }
  
  handleSpreadsheet() {
  }
	handleExpandClick() {
		this.setState((prevState) => ({
      expanded: !prevState.expanded
    }));
	}

  render() {
    const { classes } = this.props;
    const { jobsApplied, expanded } = this.state;

    return (
      <div className={ classes.root }>
        <Grid container
          spacing={ 3 }
          alignItems="center"
          justify="center"
        >
        	<Grid item xs={ 12 } sm={ 4 }>
						<Button
							fullWidth
							label="Search"
							primary={true}
							margin="normal"
							variant="contained"
							onClick={ () => this.handleSpreadsheet() }
						>
							EXPORT TO GOOGLE SPREADSHEETS
						</Button>
        	</Grid> 
          { Object.keys(jobsApplied).map((key) => (
            <Grid item xs={ 12 }>
              <Card className={ classes.card } id={ key }>
                <CardHeader
                  action={
                    <IconButton aria-label="Settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  titleTypographyProps={{  }}
                  title={ jobsApplied[key].job_title + ' ' + jobsApplied[key].role + ' at ' + jobsApplied[key].company }
                  subheader={ 'Applied On: ' + jobsApplied[key].date_applied }
                />
                <CardContent>
                  <Typography variant="body1" color="textSecondary" component="p">
                    { 'Interviews Received: '}
                    { Object.keys(jobsApplied[key].interview).length === 0 ? 'None': jobsApplied[key].interview.join(', ') }
                  </Typography>
                  <Typography variant="body1" color="textSecondary" component="p">
                    { 'Offer Status: '}
                    { Object.keys(jobsApplied[key].status).length === 0 ? 'None': jobsApplied[key].status }
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton
                    className={ classes.expand, {
                      [classes.expandOpen]: expanded,
                    }}
                    onClick={ () => this.handleExpandClick() }
                    aria-expanded={expanded}
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions> 
                <Collapse in={ expanded } timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      { 'Notes: ' + jobsApplied[key].notes }
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AppliedJobs);
