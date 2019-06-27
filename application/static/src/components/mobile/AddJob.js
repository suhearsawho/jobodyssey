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

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'white',
    color: 'black',
  },
}));
const typesInterviews = [
  {
		value: 'Phone Screening',
		label: 'Phone Screening',
	},
	{
		value: 'Phone Interview',
		label: 'Phone Interview',
	},
	{
		value: 'Onsite Interview',
		label: 'Onsite Interview',
	},
  {
    value: 'Recruiter Call',
    label: 'Recruiter Call',
  },

];

const typesPositions = [
  {
    value: 'Full Time',
    label: 'Full Time',
  },
  {
    value: 'Part Time',
    label: 'Part Time',
  },
  {
    value: 'Internship',
    label: 'Internship',
  },
];

const typesOfferStatus = [
  {
    value: 'Applied',
    label: 'Applied',
  },
  {
    value: 'Interviewing',
    label: 'Interviewing',
  },
  {
    value: 'Offer Stage',
    label: 'Offer Stage',
  },
  {
    value: 'Archived',
    label: 'Archived',
  },
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

export default function AddJob() {
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
    languages: [],
    open: false,
  });

  let today = new Date();
  let date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-';
  date += ("0" + today.getDate()).slice(-2);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className={classes.root}>
      <Grid container
        spacing={ 3 }
        justify="center"
      >
        <Grid item xs={ 12 } sm={ 6 }>
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
        <Grid item xs={ 12 } sm={ 6 }>
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
        <Grid item xs={ 12 } sm={ 8 }>
          <TextField
            required
            fullWidth
            id="address"
            variant="outlined"
            label="Office Location (City, State, Country)"
            value={ values.address }
            onChange={ handleChange('address') }
          />
          <TextField
            fullWidth
            id="url"
            variant="outlined"
            label="URL"
            className={ classes.interior }
            value={ values.jobPostURL }
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
            value={ values.notes }
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
            <InputLabel htmlFor="select-multiple">Interview Progress</InputLabel>
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
            <InputLabel htmlFor="select">Status</InputLabel>
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
          >
            SUBMIT
          </Button>
        </Grid>
      </Grid>          
    </div>
  );
}
