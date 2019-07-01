import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import getUrl from '../tools/getUrl';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'white',
    color: 'black',
  },
}));

const typesInterviews = [
  'Recruiter Call', 'Onsite', 'Tech Screen', 'Awaiting Decision', 'Phone Interview'
];

const typesOfferStatus = [
  'Applied', 'Interviewing', 'Offer Stage', 'Archived'
];

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

function getCurrentDate() {
  let today = new Date();
  let date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-';
  date += ("0" + today.getDate()).slice(-2);
  return date
}

export default function AddJob(props) {
  const classes = useStyles();
  const date = getCurrentDate();
  const { handleScreen } = props;
  const [values, setValues] = React.useState({
    company: '',
    jobTitle: '',
    dateApplied: date,
    offerStatus: '',
    url: '',
    address: '',
    interviewProgress: '',
    notes: '',
  });

  const [open, setOpen] = React.useState(false);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClose = () => {
    this.setOpen(!open);
  };

  const handleSubmit = () => {
    if (values.company.trim() === '' || values.jobTitle.trim() === ''
        || values.address.trim() === '') {
      console.log("didn't fill out mandatory fields");
      /* Todo : Add a warning here */
    } else {
      let url = getUrl('/api/jobs/applied')
      $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          company: values.company,
          job_title: values.jobTitle,
          date_applied: values.dateApplied,
          status: values.offerStatus,
          url: values.url,
          location: values.address,
          interview_progress: values.interviewProgress,
          notes: values.notes,
        }),
        success: () => {
          setValues({
            company: '',
            jobTitle: '',
            dateApplied: date,
            offerStatus: '',
            url: '',
            address: '',
            interviewProgress: '',
            notes: '',
          });
        }
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container
        spacing={ 3 }
        justify="center"
      >
        <Grid item xs={ 12 }>
          <TextField
            required
            fullWidth
            id="company"
            variant="outlined"
            label="Company Name"
            value={ values.company }
            onChange={ handleChange('company') }
          />
        </Grid>
        <Grid item xs={ 12 }>
          <TextField
            fullWidth
            required
            id="jobtitle"
            variant="outlined"
            value={ values.jobTitle }
            label="Job Title"
            onChange={ handleChange('jobTitle') }
          />
        </Grid>
        <Grid item xs={ 12 }>
          <TextField
            required
            fullWidth
            id="address"
            variant="outlined"
            label="Office Location (City, State, Country)"
            value={ values.address }
            onChange={ handleChange('address') }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="url"
            variant="outlined"
            label="URL"
            className={ classes.interior }
            value={ values.url}
            onChange={ handleChange('url') }
          />
        </Grid>
        <Grid item xs={ 12 }>
          <TextField
            fullWidth
            multiline
            id="notes"
            variant="outlined"
            label="Notes"
            rows={ 5 }
            onChange={ handleChange('notes') }
            value={ values.notes }
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Important Notes (Contact Info, Tips, etc.)"
          />
        </Grid>
        <Grid item xs={ 12 }>
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
        <Grid item xs={ 6 }>
          <FormControl
            variant="outlined"
            fullWidth
          >
            <InputLabel htmlFor="select">Interview Progress</InputLabel>
            <Select
              value={ values.interviewProgress }
              onChange={ handleChange('interviewProgress') }
              input={<OutlinedInput id="select" />}
              MenuProps={ MenuProps }
            >
              {	typesInterviews.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={ 6 }>
          <FormControl
            variant="outlined"
            fullWidth
          >
            <InputLabel htmlFor="select">Status</InputLabel>
            <Select
              value={ values.offerStatus }
              onChange={ handleChange('offerStatus') }
              input={ <OutlinedInput id="select" /> }
              MenuProps={ MenuProps }
            >
              {	typesOfferStatus.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            label="Submit"
            primary={true}
            margin="normal"
            variant="contained"
            onClick={ handleSubmit }
          >
            SUBMIT
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            label="Cancel"
            primary={true}
            margin="normal"
            variant="contained"
            onClick={ handleScreen }
          >
            CANCEL
          </Button>
        </Grid>
      </Grid>          
    </div>
  );
}
