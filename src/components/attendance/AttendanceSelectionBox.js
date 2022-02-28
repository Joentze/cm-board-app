import { useState } from "react";
import AttendanceSessionSelect from "./AttendanceSessionSelect";
import DatePicker from "@mui/lab/MobileDatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {
  getSelectClassFromLocalStorage,
  saveSelectClassToLocalStorage,
} from "../handlers/TableValueHandlers";
import {
  getBirthYear,
  isSunday,
  dateTodayEightString,
} from "../handlers/GetAttendanceId";
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
  const [date, setDate] = useState(new Date());
  const [selectVal, setSelectVal] = useState(
    getSelectClassFromLocalStorage("FPP6")
  );

  const onSelect = (event) => {
    console.log(event);
    setSelectVal(event);
    saveSelectClassToLocalStorage(event);
    assignAttendance(event, date);
  };
  const onSetDate = (value) => {
    let date = new Date(value);
    setDate(value);
    if (dateTodayEightString(date).length === 8) {
      assignAttendance(selectVal, date);
    }
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
                //console.lognewValue);
                onSetDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
    </>
  );
};

export default AttendanceSelectionBox;
