import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Snackbar from '@material-ui/core/Snackbar';
import Grow from '@material-ui/core/Grow';
import WarningIcon from '@material-ui/icons/Warning';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import { amber } from '@material-ui/core/colors';

const typesInterviews = [
	{
		value: 'phone_screen',
		label: 'Phone Screening',
	},
	{
		value: 'phone_interview',
		label: 'Phone Interview',
	},
	{
		value: 'onsite_interview',
		label: 'Onsite Interview',
	},
];

const typesPositions = [
  {
    value: 'full_time',
    label: 'Full Time',
  },
  {
    value: 'part_time',
    label: 'Part Time',
  },
  {
    value: 'internship',
    label: 'Internship',
  },
];

const typesOfferStatus = [
  {
    value: 'waiting',
    label: 'Waiting to Hear Back',
  },
  {
    value: 'rejection',
    label: 'Rejection',
  },
  {
    value: 'offer',
    label: 'Received Offer',
  },
  {
    value: 'acceptance_offer',
    label: 'Acceptance of Offer',
  },
  {
    value: 'rejection_offer',
    label: 'Rejection of Offer',
  },
];


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
	},
  company: {
  },
  warning: {
    bottom: '-3rem',
    backgroundColor: amber[700],
  },
  menu: {
    width: 200,
  },
  interior: {
    marginTop: '24px',
  },
  button: {
    width: '75%',
  },
  iconVariant: {
    opcaity: 0.9,
    marginRight: theme.spacing(1),
  },
  icon: {
    fontSize: 20,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
}));


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function GrowTransition(props) {
  return <Grow {...props} />;
}

export default function AppliedForm(props) {
  let today = new Date();
  let date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-';
  date += ("0" + today.getDate()).slice(-2);
  
  const classes = useStyles();
  const [values, setValues] = React.useState({
    company: '',
    dateApplied: date,
    jobTitle: '',
    interview: [],
    offerStatus: '',
    notes: '',
    jobPostURL: '',
    address: '',
    open: false,
    Transition: Grow,
  });

  const handleSubmit = () => {
    if (values.company.trim() === '' || values.address.trim() === '' 
        || values.interview.length === 0) {
      console.log('passed condition');
      setValues({...values, open: true });
    } else { 
      let ipAddress = window.location.hostname;
      let url;
      if (ipAddress.trim() === '127.0.0.1'.trim())
        url = 'http://' + ipAddress + ':8000/api/jobs/applied';
      else
        url = 'http://'+ ipAddress + '/api/jobs/applied';

      $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({ ...values }),
        success: (data) => {
          console.log(data);
          setValues({
            company: '',
            dateApplied: date,
            jobTitle: '',
            interview: [],
            offerStatus: '',
            notes: '',
            jobPostURL: '',
            address: '',
          });
        }
      });
    }
  };
  
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  function handleClose() {
    setValues({
      ...values,
      open: false,
    });
  }
  return (
    <div className={ classes.root }>
      <Grid container 
        spacing={ 3 }
        alignItems="center"
        justify="center"
      >
        <Grid item xs={ 12 } sm={ 8 }>
          <TextField
            required
            fullWidth
            id="company"
            variant="outlined"
            label="Company"
            onChange={ handleChange('company') }
          />
        </Grid>
        <Grid item xs={ 12 } sm={ 4 }>
          <TextField
            fullWidth
            select
            required
            id="jobtitle"
            variant="outlined"
            value={ values.jobTitle }
            label="Position"
            onChange={ handleChange('jobTitle') }
          >
            {typesPositions.map(option => (
              <MenuItem key={ option.value } value={ option.value }>
                { option.label }
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={ 12 } sm={ 8 }>
          <TextField
            required
            fullWidth
            id="address"
            variant="outlined"
            label="Address"
            onChange={ handleChange('address') }
          />
          <TextField
            fullWidth
            id="url"
            variant="outlined"
            label="URL of Job Post"
            className={ classes.interior }
            onChange={ handleChange('jobPostURL') }
          />
        </Grid>
        <Grid item xs={ 12 } sm={ 4 }>
          <TextField
            fullWidth
            multiline
            id="notes"
            variant="outlined"
            label="Notes"
            rows={ 5 }
            onChange={ handleChange('notes') }
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Important Notes (Contact Info, Tips, etc.)"
          />
        </Grid>
        <Grid item xs={ 12 } sm={ 4 }>
          <TextField
            fullWidth
            id="date"
            variant="outlined"
            label="Date Applied"
            type="date"
            defaultValue={ date }
            onChange={ handleChange('dateApplied') }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={ 6 } sm={ 4 }>
          <FormControl
            variant="outlined" 
            fullWidth
          >
            <InputLabel htmlFor="select-multiple">Interviews Received</InputLabel>
            <Select
              multiple
              value={ values.interview }
              onChange={ handleChange('interview') }
              input={<OutlinedInput id="select-multiple" />}
              MenuProps={ MenuProps }
            >
              {	typesInterviews.map(name => (
                <MenuItem key={name.value} value={name.value}>
                  {name.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={ 6 } sm={ 4 }>
          <FormControl
            variant="outlined"
            fullWidth
          >
            <InputLabel htmlFor="select">Offer Status</InputLabel>
            <Select
              value={ values.offerStatus }
              onChange={ handleChange('offerStatus') }
              input={ <OutlinedInput id="select" /> }
              MenuProps={ MenuProps }
            >
              {	typesOfferStatus.map(name => (
                <MenuItem key={name.value} value={name.value}>
                  {name.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={ 12 } sm={ 4 }>
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
 			<Snackbar
        open={ values.open }
        onClose={ handleClose }
        TransitionComponent={ values.Transition }
        className={ classes.warning }
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <React.Fragment>
            <span id="message-id" className={ classes.message }>
              <WarningIcon className={ classes.icon, classes.iconVariant } />
              Please Fill Required Fields
            </span>
          </React.Fragment>
        }
      />
    </div>
  );
}
