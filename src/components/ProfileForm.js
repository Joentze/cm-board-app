import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import DatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useState, useContext } from "react";
import { UserFirebaseAuth } from "./handlers/UserContext";
import { db } from "../base";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const ProfileForm = () => {
  const service = ["ENG", "BIL", "CHI", "HOK", "TC"];
  const [date, setDate] = useState(null);
  const [selectVal, setSelectVal] = useState(service[0]);
  const navigate = useNavigate();
  const currentUser = useContext(UserFirebaseAuth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleForm = async (data) => {
    let profileData = {
      ...data,
      service: selectVal,
      birthdate: date,
      setProfile: true,
    };
    db.collection("users")
      .doc(currentUser.uid)
      .set(profileData, { merge: true })
      .then(() => {
        window.location.reload();
      });
  };

  const handleSelect = (data) => {
    //console.log"select change", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)}>
        <TextField
          id="standard-basic"
          required
          {...register("name")}
          label="Name (as in NRIC)"
          type="text"
          variant="outlined"
          style={{ width: "75vw", marginTop: "10px" }}
        />
        <br></br>
        <br></br>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date mobile"
            inputFormat="MM/dd/yyyy"
            value={date}
            onChange={(newValue) => {
              //console.lognewValue);
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <br></br>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectVal}
          label={"Attending Service"}
          onChange={(event) => {
            setSelectVal(event.target.value);
          }}
        >
          {service.map((item) => {
            return (
              <MenuItem key={`${item}_key`} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          id="standard-basic"
          {...register("address")}
          label="Address"
          variant="outlined"
          type="text"
          style={{ width: "75vw", marginTop: "10px" }}
        />
        <TextField
          id="standard-basic"
          {...register("contact")}
          label="Contact Number"
          variant="outlined"
          type="text"
          style={{ width: "75vw", marginTop: "10px" }}
        />
        <br></br>
        <br></br>
        <Button variant="outlined" type="submit">
          submit
        </Button>
      </form>
    </>
  );
};
export default ProfileForm;
