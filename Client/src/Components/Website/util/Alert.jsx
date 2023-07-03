import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Alert({show, title, message, buttonMessage, handleClick}) {
    const [open, setOpen] = React.useState(show);


  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect( () => {
    setOpen(show)
  }, [show])


  return (
    <div onClick={handleClick || handleClose}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={handleClick || handleClose}>
          {buttonMessage}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}