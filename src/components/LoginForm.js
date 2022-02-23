import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { LoginGoogle } from './LoginGoogle'
import { auth } from '../base'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
export const LoginForm =()=>{
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const handleLogin = async(data)=>{
        auth.signInWithEmailAndPassword(data.email, data.password)
        .then(()=>{
            navigate('/')
        }).catch((error)=>{
            alert(error)
        })
    }
    return (
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
        <br></br>
        <br></br>
        <Button variant="outlined"type="submit">submit</Button>
    </form>
            <br></br>
            <br></br>
            <LoginGoogle/>

    </>)
}