import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { db } from "../base";
let dummyValues = {
  Peter: 1,
  John: 2,
  James: 0,
  Jesus: 1,
};

export default function AttendanceTable() {
  const status = ["Absent", "Church", "Zoom"];
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
      {Object.keys(tableVal)
        .sort()
        .map((item, key) => {
          return (
            <Stack direction={"row"} spacing={"10vw"} key={key}>
              <h2>{item}</h2>
              <Chip
                label={status[tableVal[item]]}
                onClick={() => {
                  handleChipClick(item);
                }}
              />
            </Stack>
          );
        })}
    </>
  );
}
