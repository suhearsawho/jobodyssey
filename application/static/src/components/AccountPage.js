import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '4rem',
      paddingRight: '4rem',
    },
    flexGrow: 1,
    marginTop: '5rem',
	},
}));

export default function AccountPage(props) {
  const classes = useStyles();
  console.log('props', props);
  const { email } = props;
  const [values, setValues] = useState({
    email: email,
    weeklyEmail: true,
  });

  const handleChange = name => event => {
    /* Todo: Verify that email is valid email */
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {

  }

  return (
    <div className={classes.root}>
      <Grid container
      spacing={ 3 }
      justify="center"
      >
        <Grid item xs={ 12 }>
          <TextField
            fullWidth
            id="email"
            variant="outlined"
            label="Email"
            value={values.email}
            onChange={handleChange('email')}
          />
        </Grid>
        <Grid item xs={ 12 }>
          <Checkbox
            checked={values.weeklyEmail}
            onChange={handleChange('weeklyEmail')}
            value={values.weeklyEmail}
            color="primary"
          />
          <p>Receive Weekly Emails?</p>
        </Grid>
        <Grid item xs={ 12 }>
          <Button
            fullWidth
            label="Search"
            primary={true}
            margin="normal"
            variant="contained"
            onClick={ handleSubmit }
          >
            SUBMIT
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
