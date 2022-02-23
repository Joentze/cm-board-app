import Button from "@mui/material/Button"
import { auth } from '../base'
import { useNavigate } from 'react-router-dom'
const SignOutButton =()=>{
    const navigate = useNavigate()
    return (
        <Button onClick={()=>{
            auth.signOut().then(()=>{
                console.log('sign out')
                navigate('/login')
            }).catch((error)=>{
                console.log(error)
            })
        }}>
            Sign Out
        </Button>
    )
}
export default SignOutButton