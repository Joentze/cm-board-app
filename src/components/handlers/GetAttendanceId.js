import { db } from "../../base";
import { useAuth } from "./UserContext";
import { ageMap } from "../../assets/CmAgeMap";
export const getBirthYear = (age) => {
  let today = new Date();
  let yearInt = today.getFullYear() - age;
  return yearInt.toString();
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

export const reformatDateFromInput = (dateString) => {
  let yyyymmdd = dateString.split("-");
  return {
    slash: `${yyyymmdd[2]}/${yyyymmdd[1]}/${yyyymmdd[0]}`,
    noslash: `${yyyymmdd[2]}${yyyymmdd[1]}${yyyymmdd[0]}`,
  };
};
