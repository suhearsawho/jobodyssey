import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  body: {
    flexGrow: 1,
    position: 'relative',
    top: '12%',
    padding: '2%'
  },
  left: {
    width: '40%',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  card: {
    maxWidth: '90%',
  },
  profilePicture: {
    padding: '5%',
    borderRadius: '30px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

class UserHomepage extends Component {
  
  render() {
    const { userData, classes } = this.props;
    console.log(userData);
    return (
      <div className={ classes.body }>
        <Grid container spacing={ 3 }>
          <Grid item xs={ 12 } sm={ 6 }>
            <Paper className={ classes.paper }>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Profile Picture"
                    height="260"
                    image="https://avatars2.githubusercontent.com/u/2894642?s=400&v=4"
                    title="Profile Picture"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      { userData.username }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Seeking a job in python
                    </Typography> 
                  </CardContent>
                </CardActionArea>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={ 12 } sm={ 6 }>
            <div>
              <Card>  
                <CardActionArea>
                <CardContent>
                  <Typography variant="body2">
                    Jobs
                  </Typography>
                </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </Grid>
        </Grid>  
      </div>
    )
  }
}

export default withStyles(styles)(UserHomepage);
