import {Wrapper} from '../LogInSignUp.styles'
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import {useNavigate} from "react-router-dom"
import {authenticateUser} from "../../../features/authSlice"
import LinearProgress from '@mui/material/LinearProgress'
import ErrorIcon from '@mui/icons-material/Error'

export interface credentials {
    username: string,
    password: string,
}

const initialState = {
    username: '',
    password: '',
}

function LogIn() {
    const [userInfo, setUserInfo] = useState<credentials>(initialState)
    const token = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const login = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (userInfo !== initialState) {
            dispatch(authenticateUser(userInfo))
        }
    }
    // console.log({token})

    useEffect(() => {
        if (token.loading === 'succeeded') {
            navigate("/", {replace: true})
        }
    }, [navigate, token])

    return <Wrapper>
        <div className={'container'}>
            <div className="buffering-container">
                {token.loading === 'pending' ?
                    <LinearProgress className={'buffering'}/> :
                    <LinearProgress className={'hidden'}/>}
            </div>
            <div className='form-container'>
                <h1 className={''}>Log in</h1>
                <p className={'log-in-info'}>Please enter your username and password to log in</p>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' onChange={(e) => {
                    setUserInfo((info: credentials) => {
                        return {...info, username: e.target.value}
                    })
                }}/>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' onChange={(e) => {
                    setUserInfo((info: credentials) => {
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
                    <p className={'sign-up-message'}>Don't have an account? <span>Sign up</span></p>
                </div>
            </div>
        </div>
    </Wrapper>
}

export default LogIn
