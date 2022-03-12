import { useState } from "react";
import AttendanceSessionSelect from "./AttendanceSessionSelect";
import DatePicker from "@mui/lab/MobileDatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { db } from "../../base";
import {
  getSelectClassFromLocalStorage,
  saveSelectClassToLocalStorage,
} from "../handlers/TableValueHandlers";
import {
  getBirthYear,
  isSunday,
  lastSunday,
  dateTodayEightString,
} from "../handlers/GetAttendanceId";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
const sessionMap = {
  FP: "1st Praise",
  FJ: "1st Jam",
  FT: "1st Praise-Tots",
  SP: "2nd Praise",
  SJ: "2nd Jam",
  ST: "2nd Praise-Tots",
};
const AttendanceSelectionBox = (props) => {
  const { assignAttendance } = props;
  const [date, setDate] = useState(lastSunday(new Date()));
  const [selectVal, setSelectVal] = useState(
    getSelectClassFromLocalStorage("FPP6")
  );
  const [alertState, setAlertState] = useState(false);

  const verifyAttendanceCreation = (select, date) => {
    if (isSunday(date)) {
      assignAttendance(select, date);
      setAlertState(false);
    } else {
      db.collection("all-attendance")
        .doc(select + dateTodayEightString(date))
        .get()
        .then((doc) => {
          if (doc.exists) {
            assignAttendance(select, date);
          } else {
            setAlertState(true);
          }
        });
    }
  };

  const onSelect = (event) => {
    setSelectVal(event);
    saveSelectClassToLocalStorage(event);
    verifyAttendanceCreation(event, date);
  };
  const onSetDate = (value) => {
    let thisDate = new Date(value);
    setDate(value);
    verifyAttendanceCreation(selectVal, thisDate);
  };
  const createAnywayAlert = () => {
    assignAttendance(selectVal, date);
    setAlertState(false);
  };
  return (
    <>
      <h1>{selectVal.substring(2, 4)}</h1>
      <p>{sessionMap[selectVal.substring(0, 2)]}</p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <AttendanceSessionSelect setSel={onSelect} />
        <div style={{ marginTop: "8px" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date"
              inputFormat="dd/MM/yyyy"
              value={date}
              onChange={(newValue) => {
                ////console.lognewValue);
                onSetDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
      {alertState ? (
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                createAnywayAlert();
              }}
            >
              CREATE ANYWAY
            </Button>
          }
        >
          Date selected is not on a Sunday!
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
};

export default AttendanceSelectionBox;
