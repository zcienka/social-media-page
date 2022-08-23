import {Wrapper, MenuPopup} from './Navbar.styles'
import React, {useState, useEffect} from 'react'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import CloseIcon from '@mui/icons-material/Close'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {deleteUser} from '../../features/userSlice'
import {PersistProfile, TokenAuth} from '../../interfaces/profileLocalStorage.interface'
import {JWTToken, logOut} from "../../features/authSlice"
import jwtDecode from "jwt-decode"

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

                if (token.access !== null) {
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
    }, [authUser.access])

    useEffect(() => {
        if (authUser.access !== null) {
            const profile: PersistProfile = JSON.parse(localStorage.getItem('persist:profile') || '{}')
            const token: TokenAuth = JSON.parse(profile.auth)
            if (token.access !== null) {
                setIsUserLoggedIn(() => true)
            } else {
                setIsUserLoggedIn(() => false)
            }
        }
    }, [authUser.access])


    const deleteAnAccount = () => {
        if (username !== null) {
            dispatch(deleteUser(username))
            setIsUserLoggedIn(() => false)
            setShowMenuPopup(() => false)
        }
    }
    const logOutTheUser = () => {
        dispatch(logOut())
        setIsUserLoggedIn(() => false)
        setShowMenuPopup(() => false)
        navigate('/', {replace: true})
    }

    return <Wrapper>
        <div className={'container'}>
            <h1 className={'name'}>Menu</h1>
            <div className={'icons-container'}>
                <AddCircleRoundedIcon className={'add-photo-icon'}
                                      onClick={() => navigate('/upload_photo', {replace: false})}/>
                {isUserLoggedIn ? <MoreVertOutlinedIcon className={'settings-icon'}
                                                        onClick={() => setShowMenuPopup(!showMenuPopup)}/> : ''}
            </div>
        </div>
        {showMenuPopup ? <MenuPopup>
            <div className={'popup-window'}>
                <div className={'close-icon'}>
                    <CloseIcon onClick={() => navigate('/', {replace: true})}/>
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
