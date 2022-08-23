import {Wrapper, MenuPopup} from './Navbar.styles'
import React, {useState, useEffect} from 'react'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import CloseIcon from '@mui/icons-material/Close'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {PersistProfile, TokenAuth} from '../../interfaces/profileLocalStorage.interface'
import {blacklistToken, JWTToken} from "../../features/authSlice"
import jwtDecode from "jwt-decode"
import {deleteUser} from "../../features/userSlice";

function Navbar() {
    const navigate = useNavigate()
    const [showMenuPopup, setShowMenuPopup] = useState(false)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [username, setUsername] = useState<string | null>(null)
    const dispatch = useAppDispatch()
    const authUser = useAppSelector(state => state.auth)

    useEffect(() => {
        if (authUser.access === null) {
            const profile: PersistProfile = JSON.parse(localStorage.getItem('persist:profile') || '{}')

            if (localStorage.getItem('persist:profile') === null) {
                setIsUserLoggedIn(() => false)
            } else {
                const token: TokenAuth = JSON.parse(profile.auth)

                if (token.access !== null && token.loading === "succeeded") {
                    const accessToken: JWTToken = jwtDecode(token.access)

                    if (accessToken.username !== null) {
                        setIsUserLoggedIn(() => true)
                        setUsername(accessToken.username)
                    }
                } else {
                    setIsUserLoggedIn(() => false)
                }
            }
        } else {
            const accessToken: JWTToken = jwtDecode(authUser.access)
            setIsUserLoggedIn(() => true)
            setUsername(accessToken.username)
        }

    }, [authUser.access, authUser, authUser.loading])

    const deleteAnAccount = () => {
        if (username !== null) {
            setIsUserLoggedIn(() => false)
            setShowMenuPopup(() => false)
            dispatch(deleteUser(username))
            dispatch(blacklistToken())
            navigate('/', {replace: false})
        }
    }
    const logOutTheUser = () => {
        dispatch(blacklistToken())
        setIsUserLoggedIn(() => false)
        setShowMenuPopup(() => false)
        navigate('/', {replace: false})
    }

    return <Wrapper>
        <div className={'container'}>
            <h1 className={'name'}>Instagram</h1>
            <div className={'icons-container'}>
                <AddCircleRoundedIcon className={'add-photo-icon'}
                                      onClick={() => navigate('/upload_photo', {replace: false})}/>
                {isUserLoggedIn ?
                    <MoreVertOutlinedIcon className={'settings-icon'}
                                          onClick={() => setShowMenuPopup(!showMenuPopup)}/> :
                    <MoreVertOutlinedIcon className={'settings-icon'}
                                          onClick={() => navigate('/login', {replace: false})}/>}
            </div>
        </div>
        {showMenuPopup && isUserLoggedIn ? <MenuPopup>
            <div className={'popup-window'}>
                <div className={'close-icon'}>
                    <CloseIcon onClick={() => setShowMenuPopup(!showMenuPopup)}/>
                </div>
                {<ul>
                    <li onClick={() => logOutTheUser()}>Logout</li>
                    <li onClick={() => deleteAnAccount()}>Delete an account</li>
                </ul>}
            </div>
        </MenuPopup> : ''}


    </Wrapper>

}

export default Navbar
