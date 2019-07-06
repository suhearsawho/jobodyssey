import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import getUrl from './tools/getUrl';
import { checkEmail } from './tools/userTools.js';

const useStyles = makeStyles(theme => ({
	root: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '10rem',
      paddingRight: '10rem',
    },
    flexGrow: 1,
    marginTop: '7rem',
	},
  title: {
    marginBottom: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '4rem',
      paddingRight: '4rem',
    },
    textAlign: 'left',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function AccountPage(props) {
  const classes = useStyles();
  const { userData } = props;
  let lastValidEmail = userData.email;

  const [editEmail, toggleEditEmail] = React.useState(false);
  const [account, setAccount] = React.useState({
    email: userData.email,
  });
  const [emailError, setEmailError] = React.useState(false);

  const handleChangeEmailScreen = () => {
    toggleEditEmail(!editEmail);
  };
  
  const handleChange = name => event => {
    setEmailError(false);
    setAccount({...account, [name]: event.target.value });
  };

  const submitEmail = () => {
    const url = getUrl('/api/user/email/') + userData.id;
    
    if (checkEmail(account.email)) {
      $.ajax({
        url: url,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          email: account.email,
        }),
        success: (data => {
          lastValidEmail = data.email;
        }),
      });
      handleChangeEmailScreen();
    } else {
      setEmailError(true);  
    }
  }

  return (
    <div className={classes.root}>
      <List aria-label="Account Settings" style={{ width: '100%' }}>
        <ListItem>
          <Typography variant="h5" gutterBottom>
            Email Settings
          </Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Grid container spacing={2}>
            { !editEmail && (
              <React.Fragment>
              <Grid item xs={12} sm={10}>
                <Typography variant="h6" gutterBottom>
                  Your email
                </Typography>
                {/* Warning! The following is a quick fix for the following problem:
                  When the user refreshes the page, account.email will not show on the page even if
                  user has a valid email. My theory is that it comes from async behavior -> the account hooks
                  is updating before the call to /user is finished and data can be passed to prop.
                  Therefore, to fix this behavior, I added three loops for the different conditions that may
                  ensue to guarantee that the user's email will show even when the user refreshes the page.
                  This is not the best fix! 
                  This falls under one of the anti-patterns of react (using a prop to initialize state that will
                  change
                 */}
                { account.email !== '' &&
                  <Typography variant="body1" gutterBottom>
                    { account.email }
                  </Typography>
                }
                { account.email === '' && userData.email !== ''&& 
                  <Typography variant="body1" gutterBottom>
                    { userData.email }
                  </Typography>
                }
                { account.email === '' && userData.email === '' &&
                  <Typography variant="body1" gutterBottom>
                    No registered email.
                  </Typography>
                }
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button 
                  variant="outlined" 
                  className={classes.button}
                  onClick={ handleChangeEmailScreen }
                >
                  Edit Email
                </Button>
              </Grid>
              </React.Fragment>
            )}
            { editEmail && (
              <React.Fragment>
              <Grid item xs={12} sm={10}>
                <Typography variant="h6" gutterBottom>
                  Your email
                </Typography>
                <TextField
                  id="standard-email"
                  label="Email"
                  className={classes.textField}
                  value={account.email}
                  onChange={handleChange('email')}
                  margin="normal"
                  error={emailError}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={submitEmail}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={handleChangeEmailScreen}
                >
                  Cancel
                </Button>
              </Grid>
              </React.Fragment>
            )}
          </Grid>
        </ListItem>
        <Divider />
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Weekly Emails
              </Typography>
              <Typography variant="body2" gutterBottom>
                Receive weekly emails with XLSX sheets that contain
                all your job applications. 
              </Typography>
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </div>
  );
}
