import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Prompt(props) {
  const {openPrompt, setOpenPrompt, deleteSingle, setIsShowing, timeoutPrompt} = props;

  const handleClose = () => {
    setOpenPrompt(false);
  };

  const deleteAndClose = () => {
    deleteSingle();
    handleClose();
  }

  const restoreArticle = () => {
    setIsShowing(true);
    clearTimeout(timeoutPrompt);
    handleClose();
  }

  return (
    <div>
      <Dialog
        open={openPrompt}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete this article?</DialogTitle>
        <DialogActions>
          <Button onClick={restoreArticle} color="primary">
            Restore
          </Button>
          <Button onClick={deleteAndClose} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}