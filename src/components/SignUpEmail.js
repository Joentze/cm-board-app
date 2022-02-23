
import { auth } from '../base'
import { userExistHandler } from './handlers/UserExists'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import {useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { FirebaseAuthData } from './handlers/UserContext'


export const SignUpEmailForm =()=>{
    const navigate = useNavigate()
    const currentUser = useContext(FirebaseAuthData)
    const [status, setStatus] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const CreateEmailPassword =(email, password)=>{
        auth.createUserWithEmailAndPassword(email, password)
        .then((userCredentials)=>{
            let user = userCredentials.user
            userExistHandler(user)
            setStatus(true)
        }).catch((error)=>{
            console.log(error.message)
        })
    }
    const handleLogin = async(data)=>{
        if(data.password === data.confirmPassword){
            CreateEmailPassword(data.email, data.password)
        }
        else{
            alert("Ensure that your passwords match")
        }
    }

    return(
        <>
        <form onSubmit={handleSubmit(handleLogin)}>
            <TextField id="standard-basic" required 
            {...register("email")} 
            label="Email" 
            type="email"
            variant="outlined" 
            style={{width:"75vw",marginTop:"10px"}}
            />
            <TextField id="standard-basic" required 
            {...register("password")} 
            label="Password"
            variant="outlined"
            type="password"
            style={{width:"75vw",marginTop:"10px"}}
            />
            
            <TextField id="standard-basic" required 
            {...register("confirmPassword")} 
            label="Confirm Password"
            variant="outlined"
            type="password"
            style={{width:"75vw",marginTop:"10px"}}
            />
            <br></br>
            <br></br>
            <Button variant="outlined"type="submit">submit</Button>
        </form>
        </>
    )
}