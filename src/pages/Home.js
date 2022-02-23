import { useNavigate } from "react-router";
import { FirebaseAuthData } from "../components/handlers/UserContext";
import { useEffect, useContext } from "react";

const HomePage =()=>{
    const navigate = useNavigate()
    const currentUser = useContext(FirebaseAuthData)
    useEffect(()=>{
        if(!currentUser){
            navigate('./login')
        }
    },[])
    return(
        <>
        <h1>Home</h1>
        </>
    )
}

export default HomePage