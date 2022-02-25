import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { db } from "../base";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const AttendanceDialog = (props) => {
  const { onClose, open, data } = props;
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleClose = () => {
    onClose();
    setContent(null);
    setLoading(true);
  };
  useEffect(() => {
    if (open && !content) {
      console.log("getting name");
      db.collection("cm-kids-data")
        .doc(data)
        .get()
        .then((doc) => {
          console.log(doc.data());
          setContent(doc.data());
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
        });
    }
  });

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{data}</DialogTitle>
      {loading ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <List sx={{ pt: 0 }}>
          <ListItem>
            <p>{content["full-name"]}</p>
          </ListItem>
        </List>
      )}
    </Dialog>
  );
};
export default AttendanceDialog;
