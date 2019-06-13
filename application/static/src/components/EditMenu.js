import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { handleEdit, handleDelete } = props

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleEditClose() {
    setAnchorEl(null);
    handleEdit();
  }
  
  function handleDeleteClose() {
    setAnchorEl(null);
    handleDelete();
  }
  
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      	<MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEditClose}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
