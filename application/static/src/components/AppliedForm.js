import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const types_interviews = [
	{
		value: 'phone screen',
		label: 'Phone Screening',
	},
	{
		value: 'phone interview',
		label: 'Phone Interview',
	},
	{
		value: 'onsite interview',
		label: 'Onsite Interview',
	},
];

const types_positions = [
  {
    value: 'full time',
    label: 'Full Time',
  },
  {
    value: 'part time',
    label: 'Part Time',
  },
  {
    value: 'internship',
    label: 'Internship',
  },
]

const useStyles = makeStyles(theme => ({
	root: {
    display: 'flex',
    flexWrap: 'wrap',
	},
  textField: {
    flexBasis: 200,
  },
  margin: {
    margin: theme.spacing(1),
  },
  company: {
  }
}));

let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

export default function AppliedForm() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    company: '',
    dateApplied: '',
    jobTitle: '',
    interview: [],
    offerStatus: [],
    notes: '',
    jobPostURL: '',
    address: '',
  })
  
  const handleChange = prop => event => {
    console.log('form change', event.target.value);
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className={ classes.root }>
      <TextField
        id="company"
        variant="outlined"
        label="Company"
        defaultValue=" "
        className={ classes.margin, classes.textField }
      />
      <TextField
        select
        displayEmpty
        id="jobtitle"
        variant="outlined"
        value={ values.jobTitle }
        label="Position"
        className={ classes.margin, classes.textField }
        onChange={ handleChange('jobTitle') }
      >
        {types_positions.map(option => (
          <MenuItem key={ option.value } value={ option.value }>
            { option.label }
          </MenuItem>
        ))}
      </TextField>
      <TextField
    		id="location"
        variant="outlined"
        label="Location"
        defaultValue=" "
        className={ classes.margin, classes.textField }
			/>
  		<TextField
        id="date"
        variant="outlined"
        label="Date Applied"
        type="date"
        defaultValue={ date }
        className={ classes.margin, classes.textField }
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        multiple
        id="interview"
        variant="outlined"
        value={ values.interview }
        label="Interviews"
        className={ classes.margin, classes.textField }
      >
        {types_interviews.map(option => (
          <MenuItem key={ option.value } value={ option.value }>
            { option.label }
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
