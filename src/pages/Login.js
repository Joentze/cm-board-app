import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
const LoginPage =()=>{
    const navigate = useNavigate()
    return(
    <>
    <h1>
        Login
    </h1>

    <LoginForm/>
    <h3 onClick={()=>{
        navigate('/signup')
    }}>
        signup
    </h3>
    </>
    )
}

export default LoginPage 