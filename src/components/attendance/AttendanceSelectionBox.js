import { useState } from "react";
import AttendanceSessionSelect from "./AttendanceSessionSelect";
const AttendanceSelectionBox = (props) => {
  const [date, setDate] = useState(null);
  const [selectVal, setSelectVal] = useState("");
  const onSelect = (value) => {
    setSelectVal(value);
    console.log("select class: ", selectVal);
  };
  const onSetDate = (value) => {
    setDate(value);
  };
  return (
    <>
      <AttendanceSessionSelect setSel={onSelect} />
    </>
  );
};

export default AttendanceSelectionBox;
