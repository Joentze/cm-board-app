import { db } from '../../base'

//redirects to information form 
export const userExistHandler =async(content)=>{
    await db.collection("user")
    .doc(content.uid)
    .get()
    .then((doc)=>{
        if(!doc.exists){
            console.log("has not signed in")
            //redirects you to sign up data form
        }else{
            console.log("signed up")
            //redirects you to home page
        }
    })
}