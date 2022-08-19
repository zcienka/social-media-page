import {Wrapper} from '../LogInSignUp.styles'
import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import LinearProgress from '@mui/material/LinearProgress'
import {Link, useNavigate} from 'react-router-dom'
import {registerUser} from '../../../features/registerSlice'
import jwtDecode from "jwt-decode"
import {JWTToken} from "../LogIn"
import {Token} from "../../../features/authSlice"
import ErrorIcon from "@mui/icons-material/Error";
import {FormatAlignLeftSharp} from "@mui/icons-material";

export interface credentials {
    username: string,
    password: string,
    posts_liked: string[],
}

const initialState = {
    username: '',
    password: '',
    posts_liked: [],
}

function SignUp() {
    const [userInfo, setUserInfo] = useState<credentials>(initialState)
    const [repeatPassword, setRepeatPassword] = useState('')
    const [checkPasswords, setCheckPasswords] = useState(false)
    const token = useAppSelector(state => state.register)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const signUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        // setCheckPasswords((checkPasswords) => !checkPasswords)
        setCheckPasswords(true)
        console.log(repeatPassword)
        console.log(userInfo.password)

        if(repeatPassword === userInfo.password) {
            e.preventDefault()

            if (userInfo.password !== initialState.password &&
                userInfo.username !== initialState.username) {
                dispatch(registerUser(userInfo))
                localStorage.setItem('currentUser', JSON.stringify(initialState.username))
            }
        }
    }

    useEffect(() => {
        if (token.loading === 'succeeded') {
            const profile: Token = JSON.parse(localStorage.getItem('profile') || '{}')
            const jwtToken: JWTToken = jwtDecode(profile.refresh)

            const user = {
                username: userInfo.username,
                userId: jwtToken.user_id,
            }

            localStorage.setItem('currentUser', JSON.stringify(user))
            navigate('/', {replace: false})
        }
    }, [userInfo.username, navigate, token])

    return <Wrapper>
        <div className={'container'}>
            <div className='buffering-container'>
                {token.loading === 'pending' ?
                    <LinearProgress className={'buffering'}/> :
                    <LinearProgress className={'hidden'}/>}
            </div>
            <div className='form-container'>
                <h1 className={''}>Create account</h1>
                <p className={'log-in-info'}>Get started with your free account</p>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' onChange={(e) => {
                    setCheckPasswords(false)
                    setUserInfo((info: credentials) => {
                        return {...info, username: e.target.value}
                    })
                }}
                />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' onChange={(e) => {
                    setCheckPasswords(false)
                    setUserInfo((info: credentials) => {
                        return {...info, password: e.target.value}
                    })
                }}/>
                <label htmlFor='repeat-password'>Repeat password</label>
                <input type='password' id='repeat-password' onChange={(e) => {
                    setCheckPasswords(false)
                    setRepeatPassword((password: string) => {
                        return e.target.value
                    })
                }}/>
                {repeatPassword !== userInfo.password && checkPasswords ?
                    <p className={'invalid-credentials'}>
                        <span><ErrorIcon/></span>Passwords are not equal
                    </p> : ''
                }
                <div className={'button-container'}>
                    <p className={'log-in-message'}>Already have an account? <span><Link to={'/login'}>Log in</Link></span></p>
                    <button className={'confirm-button'} onClick={(e) => signUp(e)}>Sign up</button>
                </div>
            </div>
        </div>
    </Wrapper>
}

export default SignUp
