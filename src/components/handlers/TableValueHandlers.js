export const saveSelectClassToLocalStorage = (value) => {
  localStorage.setItem("sessionCode", value);
};

export const getSelectClassFromLocalStorage = (defaultVal) => {
  let getVal = localStorage.getItem("sessionCode");
  if (getVal !== undefined) {
    return getVal;
  } else {
    saveSelectClassToLocalStorage(defaultVal);
    return defaultVal;
  }
};
