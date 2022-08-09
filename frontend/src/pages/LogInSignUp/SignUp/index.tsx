import {Wrapper} from '../LogInSignUp.styles'
import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import LinearProgress from '@mui/material/LinearProgress'
import {useNavigate} from 'react-router-dom'
import {registerUser} from '../../../features/userSlice'

export interface credentials {
    username: string,
    password: string,
}

const initialState = {
    username: '',
    password: '',
}

function SignUp() {
    const [userInfo, setUserInfo] = useState<credentials>(initialState)
    const response = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const signUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (userInfo !== initialState) {
            dispatch(registerUser(userInfo))
        }
    }

    useEffect(() => {
        if (response.loading === 'succeeded') {
            navigate('/', {replace: true})
        }
    }, [navigate, response])
    console.log(response.loading)

    return <Wrapper>
        <div className={'container'}>
            <div className='buffering-container'>
                {response.loading === 'pending' ?
                    <LinearProgress className={'buffering'}/> :
                    <LinearProgress className={'hidden'}/>}
            </div>
            <div className='form-container'>
                <h1 className={''}>Create account</h1>
                <p className={'log-in-info'}>Get started with your free account</p>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' onChange={(e) => {
                    setUserInfo((info: credentials) => {
                        return {...info, username: e.target.value}
                    })
                }}
                />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' onChange={(e) => {
                    setUserInfo((info: credentials) => {
                        return {...info, password: e.target.value}
                    })
                }}/>
                <label htmlFor='repeat-password'>Repeat password</label>
                <input type='password' id='repeat-password'/>
                <div className={'button-container'}>
                    <p className={'log-in-message'}>Already have an account? <span>Log in</span></p>
                    <button className={'confirm-button'} onClick={(e) => signUp(e)}>Sign up</button>
                </div>
            </div>
        </div>
    </Wrapper>
}

export default SignUp
