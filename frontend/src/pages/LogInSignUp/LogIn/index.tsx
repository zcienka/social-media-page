import {Wrapper} from '../LogInSignUp.styles'
import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import {Link, useNavigate} from 'react-router-dom'
import {authenticateUser, Token} from '../../../features/authSlice'
import LinearProgress from '@mui/material/LinearProgress'
import ErrorIcon from '@mui/icons-material/Error'
import jwtDecode from "jwt-decode";

export interface Credentials {
    username: string,
    password: string,
}

const initialState = {
    username: '',
    password: '',
}

export interface JWTToken {
    token_type: string,
    exp: number,
    iat: number,
    jti: string,
    user_id: number,
}

function LogIn() {
    const [userInfo, setUserInfo] = useState<Credentials>(initialState)
    const token = useAppSelector(state => state.auth)
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
        if (token.loading === 'succeeded') {
            const currentUser: Token = JSON.parse(localStorage.getItem('profile') || '{}')
            const jwtToken: JWTToken = jwtDecode(currentUser.refresh)

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
                {token.loading === 'failed' ?
                    <p className={'invalid-credentials'}>
                        <span><ErrorIcon/></span>Invalid username or password
                    </p> : ''
                }
                <div className={'button-container'}>
                    <button className={'confirm-button'} onClick={(e) => login(e)}>Log in</button>
                    <p className={'sign-up-message'}>Don't have an account? <span><Link to={'/signup'}> Sign up</Link> </span>
                    </p>
                </div>
            </div>
        </div>
    </Wrapper>
}

export default LogIn
