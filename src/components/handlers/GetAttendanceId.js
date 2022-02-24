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
  let date = today.getDate().toString();
  let month = padTo2Digits(today.getMonth() + 1);
  let year = today.getFullYear().toString();
  return date + month + year;
};
