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
import getUrl from './tools/getUrl';

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
    value: 'Waiting to Hear Back',
    label: 'Waiting to Hear Back',
  },
  {
    value: 'Rejection',
    label: 'Rejection',
  },
  {
    value: 'Received Offer',
    label: 'Received Offer',
  },
  {
    value: 'Acceptance of Offer',
    label: 'Acceptance of Offer',
  },
  {
    value: 'Rejection of Offer',
    label: 'Rejection of Offer',
  },
];

const typesRoles = [
  {
    value: 'Full Stack',
    label: 'Full Stack',
  },
  {
    value: 'Backend',
    label: 'Backend',
  },
  {
    value: 'Frontend',
    label: 'Frontend',
  },
  {
    value: 'SRE',
    label: 'SRE',
  },
  {
    value: 'Dev-Ops',
    label: 'Dev-Ops',
  },
]

const typesLanguages = ['C', 'C++', 'C#', 'CSS', 'HTML', 'Java', 'Javascript', 'Objective-C', 'PHP', 'Python', 'Ruby', 'SQL', 'Swift']

const useStyles = makeStyles(theme => ({
	root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    flexGrow: 1,
	},
  warning: {
    bottom: '1rem',
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
  const date = props.job.date_applied;
  const classes = useStyles();
  const { job, id } = props
  const [values, setValues] = React.useState({
    company: job.company,
    dateApplied: job.date_applied,
    jobTitle: job.job_title,
    interview: job.interview,
    offerStatus: job.status,
    notes: job.notes,
    jobPostURL: job.url,
    address: job.address,
    languages: job.languages,
    id: id,
    open: false,
    Transition: Grow,
  });

  const handleSubmit = () => {
    if (values.company.trim() === '' || values.address.trim() === '' ||
        values.jobTitle.trim() === '') { 
      setValues({...values, open: true });
    } else { 
      let url = getUrl('/api/jobs/applied');
      
      const result = {
        date_applied: values.dateApplied,
        company: values.company,
        url: values.jobPostURL,
        job_title: values.jobTitle,
        address: values.address,
        status: values.offerStatus,
        interview: values.interview,
        notes: values.notes,
        languages: values.languages,
      }

      $.ajax({
        type: 'PUT',
        url: url,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          ...result,
          id: values.id,
        }),
        success: (data) => {
          props.handleToken(data.token, data.message);
          props.handleClose(result);
        }
      });
    }
  };
 
  const handleCancel = () => {
    props.handleCancel();
  }

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
        spacing={ 1 }
        alignItems="center"
        justify="center"
      >
        <Grid item xs={ 12 } sm={ 4 }>
          <TextField
            required
            fullWidth
            id="company"
            variant="outlined"
            label="Company"
            value={ values.company }
            onChange={ handleChange('company') }
          />
        </Grid>
        <Grid item xs={ 12 } sm={ 4 }>
          <TextField
            fullWidth
            required
            id="jobtitle"
            variant="outlined"
            value={ values.jobTitle }
            label="Position"
            onChange={ handleChange('jobTitle') }
          />
        </Grid>
        <Grid item xs={ 12 } sm={ 4 }>
          <FormControl
            variant="outlined" 
            fullWidth
          >
            <InputLabel htmlFor="select-multiple">Languages</InputLabel>
            <Select
              multiple
              value={ values.languages }
              onChange={ handleChange('languages') }
              input={<OutlinedInput id="select-multiple" />}
              MenuProps={ MenuProps }
            >
              {	typesLanguages.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={ 12 } sm={ 8 }>
          <TextField
            required
            fullWidth
            id="address"
            variant="outlined"
            label="Address"
            value={ values.address }
            onChange={ handleChange('address') }
          />
          <TextField
            fullWidth
            id="url"
            variant="outlined"
            label="URL of Job Post"
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
        <Grid item xs={ 12 } sm={ 4 }>
          <Button
            fullWidth
            label="Search"
            primary={true}
            margin="normal"
            variant="contained"
            onClick={ handleCancel }
          >
            CANCEL
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
