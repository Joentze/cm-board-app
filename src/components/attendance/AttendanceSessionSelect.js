import * as React from "react";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ageGroups = {
  P: ["P6", "P5", "P4", "P3"],
  J: ["P2", "P1", "K2", "K1", "N1"],
  T: ["N0"],
};
const sessions = [
  { session: "1st Praise", code: "FP" },
  { session: "1st Jam", code: "FJ" },
  { session: "1st Praise-Tots", code: "FT" },
  { session: "2nd Praise", code: "SP" },
  { session: "2nd Jam", code: "SJ" },
  { session: "2nd Praise-Tots", code: "ST" },
];
const AttendanceSessionSelect = (props) => {
  const { setSel } = props;
  const theme = useTheme();
  const [sessionCode, setSessionCode] = useState("");
  const handleSel = (event) => {
    console.log(event.target.value);
    setSel(event.target.value);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: "30vw" }}>
        <InputLabel htmlFor="grouped-select">Session & Class</InputLabel>
        <Select
          defaultValue=""
          id="grouped-select"
          label="Session & Class"
          onChange={handleSel}
        >
          <ListSubheader>1st Praise</ListSubheader>
          {ageGroups["P"].map((item) => (
            <MenuItem value={"FP" + item}>{item}</MenuItem>
          ))}
          <ListSubheader>1st Jam</ListSubheader>
          {ageGroups["J"].map((item) => (
            <MenuItem value={"FJ" + item}>{item}</MenuItem>
          ))}
          <ListSubheader>1st Praise-Tots</ListSubheader>
          {ageGroups["T"].map((item) => (
            <MenuItem value={"FT" + item}>{item}</MenuItem>
          ))}
          <ListSubheader>2nd Praise</ListSubheader>
          {ageGroups["P"].map((item) => (
            <MenuItem value={"SP" + item}>{item}</MenuItem>
          ))}
          <ListSubheader>2nd Jam</ListSubheader>
          {ageGroups["J"].map((item) => (
            <MenuItem value={"SJ" + item}>{item}</MenuItem>
          ))}
          <ListSubheader>2nd Praise-Tots</ListSubheader>
          {ageGroups["T"].map((item) => (
            <MenuItem value={"ST" + item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
export default AttendanceSessionSelect;
