import { useState } from "react";
import AttendanceSessionSelect from "./AttendanceSessionSelect";
import DatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import {
  getBirthYear,
  isSunday,
  dateTodayEightString,
} from "../handlers/GetAttendanceId";
const AttendanceSelectionBox = (props) => {
  const [date, setDate] = useState(null);
  const [selectVal, setSelectVal] = useState("");
  const onSelect = (event) => {
    console.log(event);
    setSelectVal(event);
  };
  const onSetDate = (value) => {
    let date = new Date(value);
    console.log(dateTodayEightString(date));
    setDate(value);
  };
  return (
    <>
      <AttendanceSessionSelect setSel={onSelect} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date mobile"
          inputFormat="dd/MM/yyyy"
          value={date}
          onChange={(newValue) => {
            //console.lognewValue);
            onSetDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default AttendanceSelectionBox;
