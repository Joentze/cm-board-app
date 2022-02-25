import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { db } from "../base";
import { chipColorMap } from "../assets/ColorMap";
import ChurchIcon from "@mui/icons-material/Church";
import ComputerIcon from "@mui/icons-material/Computer";
import CancelIcon from "@mui/icons-material/Cancel";
import { NoEncryption } from "@mui/icons-material";

let dummyValues = {
  Peter: 1,
  John: 2,
  James: 0,
  Jesus: 1,
};

export default function AttendanceTable() {
  const status = ["Absent", "Church", "Zoom"];
  const icons = [
    <CancelIcon fontSize="small" />,
    <ChurchIcon fontSize="small" style={{ color: "white" }} />,
    <ComputerIcon fontSize="small" style={{ color: "white" }} />,
  ];
  const [tableVal, setTableVal] = useState(dummyValues);
  const handleChipClick = async (item) => {
    if (tableVal[item] < 2) {
      tableVal[item] += 1;
    } else if (tableVal[item] >= 2) {
      tableVal[item] = 0;
    }
    await db
      .collection("cm-attendance")
      .doc("022021")
      .set({ FPP401022021: tableVal }, { merge: true });
  };

  useEffect(() => {
    db.collection("cm-attendance")
      .doc("022021")
      .onSnapshot((doc) => {
        let thisData = doc.data()["FPP401022021"];
        console.log(thisData);
        setTableVal(thisData);
      });
  }, []);
  return (
    <>
      <div class="table-attendance">
        <div class="attendance-row-flex fixed-head">
          <div className={"Attendance-table-name"}>Name</div>
          <div className={"Attendance-table-chip"}>Attendance</div>
        </div>
        <Divider />
        <div className={"attendance-scroll-box"}>
          {Object.keys(tableVal)
            .sort()
            .map((item, key) => {
              return (
                <div class="attendance-row-flex">
                  <div className={"Attendance-table-name"}>
                    <u>{item}</u>
                  </div>
                  <div className={"Attendance-table-chip"}>
                    <Chip
                      icon={icons[tableVal[item]]}
                      style={chipColorMap["paper"][status[tableVal[item]]]}
                      size="large"
                      label={status[tableVal[item]]}
                      variant="outlined"
                      onClick={() => {
                        handleChipClick(item);
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
