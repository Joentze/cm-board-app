import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { db } from "../../base";
import { chipColorMap } from "../../assets/ColorMap";
import ChurchIcon from "@mui/icons-material/Church";
import ComputerIcon from "@mui/icons-material/Computer";
import CancelIcon from "@mui/icons-material/Cancel";
import AttendanceDialog from "./AttendanceDialog";
import AttendanceSelectionBox from "./AttendanceSelectionBox";
import { useAuth } from "../handlers/UserContext";
import {
  createAttendanceMap,
  createAttendanceRecord,
} from "../handlers/GetAttendanceId";

let dummyValues = {
  "Bryan Yip": 1,
  John: 2,
  James: 0,
  Jesus: 1,
};
const status = ["Absent", "Church", "Zoom"];

const icons = [
  <CancelIcon fontSize="small" />,
  <ChurchIcon fontSize="small" style={{ color: "white" }} />,
  <ComputerIcon fontSize="small" style={{ color: "white" }} />,
];

export default function AttendanceTable() {
  const [dialogState, setDialogState] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  const currentUser = useAuth();
  const [tableVal, setTableVal] = useState({});
  const handleDialogClose = () => {
    setSelectedName(null);
    setDialogState(false);
  };

  const handleDialogOpen = (name) => {
    setSelectedName(name);
    setDialogState(true);
  };
  //gets ID from select and checks if attendnace has been created
  //if it has, set table values to the selected attendance
  //else, create new attendance and a record of attendance
  //each ID is unique
  const useOnAttendanceIdChange = (id) => {
    const mmyyyy = id.substring(5, 11);
    db.collection("all-attendance")
      .get()
      .then((doc) => {
        if (doc.exists) {
          db.collection("cm-attendance")
            .doc(mmyyyy)
            .get()
            .then((doc) => {
              setTableVal(doc.data()[id]);
            });
        } else {
          createAttendanceRecord(id, currentUser);
        }
      });
  };

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
      <AttendanceSelectionBox />
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
                  <div
                    className={"Attendance-table-name"}
                    onClick={() => {
                      handleDialogOpen(item);
                    }}
                  >
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
      <AttendanceDialog
        onClose={handleDialogClose}
        open={dialogState}
        data={selectedName}
      />
    </>
  );
}
