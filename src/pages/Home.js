import { useNavigate } from "react-router";
import { UserFirebaseAuth } from "../components/handlers/UserContext";
import { useEffect, useContext } from "react";
import SignOutButton from '../components/SignoutButton'

const HomePage =()=>{
    const navigate = useNavigate()
    const currentUser = useContext(UserFirebaseAuth)
    useEffect(()=>{
        if(!currentUser){
            navigate('./login')
        }
    },[])
    return(
        <>
        <h1>Home</h1>
        <SignOutButton/>
        </>
    )
}

export default HomePage