import {Wrapper, DragAndDropWrapper, MenuPopup} from './Navbar.styles'
import React, {useState, useCallback, useEffect} from 'react'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import {useDropzone} from 'react-dropzone'
import File from 'react-dropzone'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import CloseIcon from '@mui/icons-material/Close'
import UploadPost from '../UploadPost'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {deleteUser} from '../../features/userSlice'
import {PersistProfile, UserAuth} from '../../interfaces/profileLocalStorage.interface'
import {logOut} from "../../features/authSlice";

function Navbar() {
    const navigate = useNavigate()
    const [showDragAndDrop, setShowDragAndDrop] = useState(false)
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

    useEffect(() => {
        if (showDragAndDrop && !isUserLoggedIn) {
            setShowDragAndDrop(false)
            navigate('/login', {replace: false})
        }
    }, [isUserLoggedIn, showDragAndDrop, navigate])

    const [image, setImage] = useState<string | null>('')
    const [showPostDetails, setShowPostDetails] = useState(false)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file: File) => {
            const reader = new FileReader()

            setShowDragAndDrop(false)
            setShowPostDetails(true)

            reader.onload = function (e) {
                setImage(e.target!.result as string)
            }
            reader.readAsDataURL(file);
            return file
        })
    }, [])

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/jpeg': [],
        },
        multiple: false,
        onDrop
    })

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
        {showDragAndDrop ?
            <DragAndDropWrapper>
                <div className='popup-window'>
                    <div className={'photo-input'} {...getRootProps()}><input
                        accept={'image/x-png,image/jpg,image/jpeg'} {...getInputProps()} />
                        <div className={'photo-icon-container'}>
                            <AddPhotoAlternateIcon className={'photo-icon'}/>
                            <p className={'drag-and-drop'}>Drag and drop your photos here</p>
                            <button className={'choose-files-btn'}>Choose your files from the computer</button>
                        </div>
                    </div>
                    <CloseIcon onClick={() => setShowDragAndDrop(!showDragAndDrop)}/>
                </div>
            </DragAndDropWrapper> : ''}
        {showPostDetails && image !== null ? <UploadPost image={image} alt={''}/> : ''}
        <div className={'container'}>
            <h1 className={'name'}>Menu</h1>
            <div className={'icons-container'}>
                <AddCircleRoundedIcon className={'add-photo-icon'}
                                      onClick={() => setShowDragAndDrop(!showDragAndDrop)}/>
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
