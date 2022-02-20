import { userExistHandler } from './handlers/UserExists'
import { auth } from '../base'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
const CreateEmailPassword =(email, password)=>{
    auth.createUserWithEmailAndPassword(email, password).then(()=>{
        userExistHandler()
    }).catch((error)=>{
        console.log(error.message)
    })
}

export const SignUpEmailForm =()=>{
    const [status, setStatus] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const handleLogin = async(data)=>{
        if(data.password == data.confirmPassword){
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