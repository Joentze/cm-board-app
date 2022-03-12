import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { db } from "../../base";
import { useState, useEffect } from "react";
const SearchBarCM = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const searchKidsName = (event) => {
    let name = event.target.value.trim().toLowerCase();
    setIsSearch(false);
    setTimeout(() => {
      setIsSearch(true);
      if (isSearch && name.length > 0) {
        console.log("search firebase");
        db.collection("cm-kids-data")
          .where("full-name", ">=", name)
          .where("full-name", "<=", name + "\uf8ff")
          .limit(10)
          .get()
          .then((querySnapshot) => {
            let thisList = [];
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              thisList.push(doc.data());
            });
            setSearchResult(thisList);
          });
      } else if (name.length == 0) {
        setSearchResult([]);
      }
    }, 200);
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={searchKidsName}
          id="standard-basic"
          label="Name Search"
          variant="standard"
        />
      </Box>
      {searchResult.map((item) => {
        return <h4>{item["full-name"]}</h4>;
      })}
    </>
  );
};

export default SearchBarCM;
