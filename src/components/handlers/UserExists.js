import { db } from "../../base";

//redirects to information form
export const userExistHandler = async (content) => {
  await db
    .collection("users")
    .doc(content.uid)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        ////console.log"has not signed in");
        //redirects you to sign up data form
        ////console.logcontent.uid);
        db.collection("users").doc(content.uid).set({
          email: content.email,
          setProfile: false,
        });
      }
    });
};
