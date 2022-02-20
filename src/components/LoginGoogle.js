import { GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../base'
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import { useCallback, useState } from 'react'
import { userExistHandler } from './handlers/UserExists'


export const LoginGoogle =()=>{
    const [content, setContent] = useState({})
    const LoginGoogleProvider = useCallback(async()=>{
        let provider = new GoogleAuthProvider()
        await auth.signInWithPopup(provider).then((result)=>{
            /** @type {firebase.auth.OAuthCredential} */
            let user = result.user
            setContent(user)
            
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