import { db } from "../../base";
import { useAuth } from "./UserContext";
import { ageMap } from "../../assets/CmAgeMap";
export const getBirthYear = (age) => {
  let today = new Date();
  return today.getFullYear() - age;
};

export const isSunday = (today) => {
  if (today.getDay() === 6) {
    return true;
  } else {
    return false;
  }
};

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};
export const dateTodayEightString = (today) => {
  let date = padTo2Digits(today.getDate());
  let month = padTo2Digits(today.getMonth() + 1);
  let year = today.getFullYear().toString();
  return date + month + year;
};

export const createAttendanceRecord = (id, currentUser) => {
  const mmyyyy = id.substring(5, 11);
  db.collection("all-attendance")
    .doc(id)
    .set({
      dateCreated: new Date(),
      creator: currentUser.email,
    })
    .then(() => {
      db.collection("cm-attendance")
        .doc(mmyyyy)
        .set({ id: createAttendanceMap(id) }, { merge: true });
    })
    .catch((error) => {
      alert(error);
    });
};

export const createAttendanceMap = (id) => {
  const classLevel = id.substring(2, 3);
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
      }
    })
    .catch((error) => {
      alert(error);
    });
  return dict;
};
