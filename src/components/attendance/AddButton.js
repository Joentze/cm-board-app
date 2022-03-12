import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/Icon";
import { set, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { db } from "../../base";
import Alert from "@mui/material/Alert";
import { Stack } from "@mui/material";
import { reformatDateFromInput } from "../handlers/GetAttendanceId";
export default function AddButton({ attendanceId }) {
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
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
  const addKidToYear = (data) => {};

  const submitFeedback = async (data) => {
    let slashDate = reformatDateFromInput(data.birthdate).slash;
    let noSlashDate = reformatDateFromInput(data.birthdate).noslash;
    db.collection("cm-kids-data")
      .doc(data.fullname)
      .set({
        "full-name": data.fullname,
        "birth-date": slashDate,
        "parent-guardian": data.parentGuardian,
        "emergency-contact": { [data.emergencyContact]: data.contactNo },
      })
      .then(() => {
        setSent(true);
        setIsWarning(false);
      });
  };
  const searchExistingName = (event) => {
    setIsSearch(false);
    setIsWarning(false);
    setTimeout(() => {
      setIsSearch(true);
      if (isSearch && event.target.value.trim().length > 0) {
        db.collection("cm-kids-data")
          .doc(event.target.value.trim())
          .get()
          .then((doc) => {
            if (doc.exists) {
              setIsWarning(true);
            } else {
              setIsWarning(false);
            }
          });
      }
    }, 3000);
  };
  return (
    <>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Kid</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the particulars of the new child.
          </DialogContentText>
          <br></br>
          {isWarning ? (
            <>
              <Alert severity="warning">
                Another kid of the same name has been detected, try changing the
                order of his/her name{" "}
                <strong>(i.e Tan John instead of John Tan)</strong>. Otherwise,
                pre-existing kid's data will be <u>overwrite</u>.
              </Alert>
              <br></br>
            </>
          ) : (
            <></>
          )}
          {isError ? (
            <Alert severity="error">
              An error occured while adding kid to attendance, please try again
              later!
            </Alert>
          ) : (
            <></>
          )}
          {sent ? (
            <Alert severity="success">Kid has been added to attendance!</Alert>
          ) : (
            <>
              <TextField
                autoFocus
                required
                {...register("fullname")}
                margin="dense"
                id="fullname"
                label="Full Name (as in NRIC)"
                type="text"
                fullWidth
                variant="outlined"
                onChange={searchExistingName}
              />
              <TextField
                {...register("birthdate")}
                required
                InputLabelProps={{ shrink: true }}
                margin="dense"
                id="birthdate"
                type="date"
                label="Birthday"
                fullWidth
                variant="outlined"
              />
              <TextField
                {...register("parentGuardian")}
                margin="dense"
                id="parent"
                label="Parent/Guardian's Name"
                type="text"
                fullWidth
                variant="outlined"
              />
              <Stack direction="row">
                <TextField
                  style={{ marginRight: "10px" }}
                  {...register("emergencyContact")}
                  margin="dense"
                  id="emergencyContact"
                  label="Emergency Contact"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  {...register("contactNo")}
                  margin="dense"
                  id="contactNo"
                  label="Contact No."
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Stack>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {sent ? (
            <Button
              onClick={() => {
                setSent(false);
              }}
            >
              Add Another Kid
            </Button>
          ) : (
            <Button onClick={handleSubmit(submitFeedback)}>Submit</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
