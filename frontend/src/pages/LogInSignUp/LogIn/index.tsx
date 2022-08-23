import {Wrapper} from '../LogInSignUp.styles'
import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import {Link, useNavigate} from 'react-router-dom'
import {authenticateUser, JWTToken} from '../../../features/authSlice'
import LinearProgress from '@mui/material/LinearProgress'
import ErrorIcon from '@mui/icons-material/Error'
import {PersistProfile, TokenAuth} from "../../../interfaces/profileLocalStorage.interface"
import jwtDecode from "jwt-decode";

export interface Credentials {
    username: string,
    password: string,
    posts_liked: string[],
}

const initialState = {
    username: '',
    password: '',
    posts_liked: [],
}


function LogIn() {
    const [userInfo, setUserInfo] = useState<Credentials>(initialState)
    const authUser = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const login = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (userInfo.password !== initialState.password &&
            userInfo.username !== initialState.username) {
            dispatch(authenticateUser(userInfo))
        }
    }

    useEffect(() => {
        if (authUser.loading === 'succeeded' || localStorage.getItem("persist:profile") !== null) {
            const profile: PersistProfile = JSON.parse(localStorage.getItem('persist:profile') || '{}')
            const token: TokenAuth = JSON.parse(profile.auth)
            if (token.access !== null) {
                const accessToken: JWTToken = jwtDecode(token.access)
                if (accessToken.username !== null) {
                    navigate('/', {replace: true})
                }
            }
        }
    }, [navigate, authUser])

    return <Wrapper>
        <div className={'container'}>
            <div className='buffering-container'>
                {authUser.loading === 'pending' ?
                    <LinearProgress className={'buffering'}/> :
                    <LinearProgress className={'hidden'}/>}
            </div>
            <div className='form-container'>
                <h1 className={''}>Log in</h1>
                <p className={'log-in-info'}>Please enter your username and password to log in</p>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' onChange={(e) => {
                    setUserInfo((info: Credentials) => {
                        return {...info, username: e.target.value}
                    })
                }}/>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' onChange={(e) => {
                    setUserInfo((info: Credentials) => {
                        return {...info, password: e.target.value}
                    })
                }}/>
                {authUser.loading === 'failed' && userInfo.username !== '' && userInfo.password !== '' ?
                    <p className={'invalid-credentials'}>
                        <span><ErrorIcon/></span>Invalid username or password
                    </p> : ''
                }
                <div className={'button-container'}>
                    <button className={'confirm-button'} onClick={(e) => login(e)}>Log in</button>
                    <p className={'sign-up-message'}>Don't have an account?
                        <span><Link to={'/signup'}> Sign up</Link> </span>
                    </p>
                </div>
            </div>
        </div>
    </Wrapper>
}

export default LogIn
