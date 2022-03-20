import { useAuth, useAccess } from "../components/handlers/UserContext";
import { db } from "../base";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceTable from "../components/attendance/AttendanceTable";
import { NoAccess } from "../components/NoAccess";
import {
  getBirthYear,
  isSunday,
  dateTodayEightString,
} from "../components/handlers/GetAttendanceId";
const DashboardPage = () => {
  const [ministry, setMinistry] = useState(null);
  const currentUser = useAuth();
  const access = useAccess();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      db.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          setMinistry(doc.data()["ministry"]);
        });
    }
  });
  return (
    <>
      {access ? (
        <>
          <h1>db access</h1>
          <AttendanceTable />
        </>
      ) : (
        <>
          <NoAccess />
          <h1>no access</h1>
        </>
      )}
    </>
  );
};

export default DashboardPage;
