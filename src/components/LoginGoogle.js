import { GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../base'
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import { userExistHandler } from './handlers/UserExists'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router';


export const LoginGoogle =()=>{
    const [content, setContent] = useState({})
    const navigate = useNavigate()
    const LoginGoogleProvider = useCallback(async()=>{
        let provider = new GoogleAuthProvider()
        await auth.signInWithPopup(provider).then((result)=>{
            /** @type {firebase.auth.OAuthCredential} */
            let user = result.user
            setContent(user)
            navigate('/')
            
        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            console.log(errorCode)
        })
        userExistHandler(content)
        
        
    })
    return(
        <>
          <IconButton
            onClick={
                LoginGoogleProvider
            }
          >
              <GoogleIcon/>
          </IconButton>
          
        </>
    )
}