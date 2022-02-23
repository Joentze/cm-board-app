import { useNavigate } from "react-router";
import { UserFirebaseAuth } from "../components/handlers/UserContext";
import { useEffect, useContext, useState } from "react";
import SignOutButton from '../components/SignoutButton'
import ProfileForm from '../components/ProfileForm'
import { db } from '../base'
const HomePage =()=>{
    const navigate = useNavigate()
    const [profile, setProfile] = useState(true)
    const currentUser = useContext(UserFirebaseAuth)
    const checkProfileState =async()=>{ 
        await db.collection("users")
        .doc(currentUser.uid)
        .get().then((doc)=>{
            setProfile(doc.data()['setProfile'])
        })
    }
    useEffect(()=>{
        if(!currentUser){
            navigate('./login')
        }
        checkProfileState()
    },[])
    return(
        <>
        <h1>Home</h1>
        {
            profile?(
                <h1>Regular Home</h1>
            ):(
            <div>
                <ProfileForm/>
            </div>
            )   
        }
        <SignOutButton/>
        </>
    )
}

export default HomePage