import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { useState, useEffect, forwardRef } from "react";
import { db } from "../../base";
import { chipColorMap } from "../../assets/ColorMap";
import ChurchIcon from "@mui/icons-material/Church";
import ComputerIcon from "@mui/icons-material/Computer";
import CancelIcon from "@mui/icons-material/Cancel";
import AttendanceDialog from "./AttendanceDialog";
import AttendanceSelectionBox from "./AttendanceSelectionBox";
import { useAuth } from "../handlers/UserContext";
import { ageMap } from "../../assets/CmAgeMap";
import { getBirthYear } from "../handlers/GetAttendanceId";
import { dateTodayEightString, lastSunday } from "../handlers/GetAttendanceId";
import { getSelectClassFromLocalStorage } from "../handlers/TableValueHandlers";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const status = ["Absent", "Church", "Zoom"];

const icons = [
  <CancelIcon fontSize="small" />,
  <ChurchIcon fontSize="small" style={{ color: "white" }} />,
  <ComputerIcon fontSize="small" style={{ color: "white" }} />,
];

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AttendanceTable() {
  const [dialogState, setDialogState] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  const currentUser = useAuth();
  const [tableVal, setTableVal] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [attdLoad, setAttdLoad] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [attendanceId, setAttendanceId] = useState(
    getSelectClassFromLocalStorage("FPP6") +
      dateTodayEightString(lastSunday(new Date()))
  );

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertState(false);
  };

  const handleDialogClose = () => {
    setSelectedName(null);
    setDialogState(false);
  };

  const handleDialogOpen = (name) => {
    setSelectedName(name);
    setDialogState(true);
  };

  const returnAttendanceId = (selectVal, date) => {
    OnAttendanceIdChange(selectVal + dateTodayEightString(date));
  };

  const createAttendanceRecord = (id, currentUser) => {
    const mmyyyy = id.substring(6, 12);
    //console.log(mmyyyy);
    //console.log("path", id);
    db.collection("all-attendance")
      .doc(id)
      .set({
        dateCreated: new Date(),
        creator: currentUser.email,
      })
      .then(() => {
        createAttendanceMap(id);
        setAlertState(true);
      })
      .catch((error) => {
        //console.log("yeet 1");
        alert(error);
      });
  };

  const createAttendanceMap = (id) => {
    const classLevel = id.substring(2, 4);
    const mmyyyy = id.substring(6, 12);
    const birthYear = getBirthYear(ageMap[classLevel]);
    let dict = {};
    db.collection("cm-kids-year")
      .doc(birthYear)
      .get()
      .then((doc) => {
        if (doc.exists) {
          for (let name of doc.data()[id[0]]) {
            dict[name] = 0;
          }
          db.collection("cm-attendance")
            .doc(mmyyyy)
            .set({ [id]: dict }, { merge: true })
            .then(() => {
              setTableVal(dict);
              setAttendanceId(id);
              setAttdLoad(true);
            });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  //gets ID from select and checks if attendnace has been created
  //if it has, set table values to the selected attendance
  //else, create new attendance and a record of attendance
  //each ID is unique
  const OnAttendanceIdChange = (id) => {
    const mmyyyy = id.substring(6, 12);
    setAttdLoad(false);
    //console.log(mmyyyy);
    //console.log("checking: ", id);
    db.collection("all-attendance")
      .doc(id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          createAttendanceRecord(id, currentUser);
        } else {
          console.log("getting existing doc", mmyyyy);
          db.collection("cm-attendance")
            .doc(mmyyyy)
            .get()
            .then((doc) => {
              setTableVal(doc.data()[id]);
            });
          setAttendanceId(id);
          setAttdLoad(true);
        }
      });
  };

  const handleChipClick = async (item) => {
    if (tableVal[item] < 2) {
      tableVal[item] += 1;
    } else if (tableVal[item] >= 2) {
      tableVal[item] = 0;
    }
    db.collection("cm-attendance")
      .doc(attendanceId.substring(6, 12))
      .set({ [attendanceId]: tableVal }, { merge: true })
      .then(() => {
        setTableVal(tableVal);
      });
  };
  //On start up get attendance via ID
  useEffect(() => {
    if (!isLoaded) {
      OnAttendanceIdChange(attendanceId);
      setIsLoaded(true);
    }
  }, [isLoaded, attendanceId]);

  useEffect(() => {
    db.collection("cm-attendance")
      .doc(attendanceId.substring(6, 12))
      .onSnapshot((doc) => {
        //console.log("snapshoting", attendanceId);
        setTableVal(doc.data()[attendanceId]);
      });
    return () => {
      setTableVal({}); // This worked for me
    };
  }, [attendanceId]);
  return (
    <>
      <AttendanceSelectionBox assignAttendance={returnAttendanceId} />
      <div class="table-attendance">
        <div class="attendance-row-flex fixed-head">
          <div className={"Attendance-table-name"}>Name</div>
          <div className={"Attendance-table-chip"}>Attendance</div>
        </div>
        <Divider />
        {isLoaded ? (
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
        ) : (
          <>
            <LinearProgress />
          </>
        )}
      </div>
      <AttendanceDialog
        onClose={handleDialogClose}
        open={dialogState}
        data={selectedName}
      />
      <Snackbar
        open={alertState}
        autoHideDuration={2000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Attendance Created Successfully
        </Alert>
      </Snackbar>
    </>
  );
}
