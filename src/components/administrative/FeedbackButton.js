import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import { useForm } from "react-hook-form";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { db } from "../../base";
import Alert from "@mui/material/Alert";

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitFeedback = async (data) => {
    if (data.feedback.length > 0) {
      db.collection("all-feedback")
        .add({ date: new Date(), text: data.feedback })
        .then(() => {
          setSent(true);
          setOpen(false);
        })
        .catch(() => {
          setIsError(true);
        });
    } else {
      setOpen(false);
    }
  };

  return (
    <div>
      <Fab variant="outlined" onClick={handleClickOpen}>
        <RateReviewIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Encountering an issue or want a feature implemented? Leave your
            suggestions & feedback here.
          </DialogContentText>
          <br></br>
          {isError ? (
            <Alert severity="error">
              Oh the irony! An error on the feedback form...Sorry!
            </Alert>
          ) : (
            <></>
          )}
          <br></br>
          {sent ? (
            <Alert severity="success">
              Your Feedback has been successfully sent. Thank you & God bless!
            </Alert>
          ) : (
            <TextField
              autoFocus
              {...register("feedback")}
              margin="dense"
              id="name"
              label="Feedback"
              type="text"
              rows={5}
              fullWidth
              variant="outlined"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(submitFeedback)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
