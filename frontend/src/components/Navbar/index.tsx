import {Wrapper, MenuPopup} from './Navbar.styles'
import React, {useState, useCallback, useEffect} from 'react'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import {useDropzone} from 'react-dropzone'
import File from 'react-dropzone'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import CloseIcon from '@mui/icons-material/Close'
import PublishPost from '../PublishPost'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {deleteUser} from '../../features/userSlice'
import {PersistProfile, UserAuth} from '../../interfaces/profileLocalStorage.interface'
import {logOut} from "../../features/authSlice";
import DragAndDrop from "../DragAndDrop"

function Navbar() {
    const navigate = useNavigate()
    const [showMenuPopup, setShowMenuPopup] = useState(false)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [username, setUsername] = useState<string | null>(null)
    const dispatch = useAppDispatch()
    const authUser = useAppSelector(state => state.auth)

    useEffect(() => {
        if (localStorage.getItem('persist:profile') === null) {
            setIsUserLoggedIn(() => false)
        } else {
            const profile: PersistProfile = JSON.parse(localStorage.getItem('persist:profile') || '{}')
            const userProfile: UserAuth = JSON.parse(profile.auth)
            if (userProfile.username !== null) {
                setIsUserLoggedIn(() => true)
                setUsername(userProfile.username)
            } else {
                setIsUserLoggedIn(() => false)
            }
        }
    }, [])

    useEffect(() => {
        if (authUser.username !== null) {
            setIsUserLoggedIn(() => true)
        }
    }, [authUser])


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
    }

    return <Wrapper>
        <div className={'container'}>
            <h1 className={'name'}>Menu</h1>
            <div className={'icons-container'}>
                <AddCircleRoundedIcon className={'add-photo-icon'}
                                      onClick={() =>  navigate('/upload_photo', {replace: false})}/>
                {isUserLoggedIn ? <MoreVertOutlinedIcon className={'settings-icon'}
                                                        onClick={() => setShowMenuPopup(!showMenuPopup)}/> : ''}
            </div>
        </div>
        {showMenuPopup ? <MenuPopup>
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
