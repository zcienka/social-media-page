import React, {useState, useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import File from 'react-dropzone'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import PublishPost from '../PublishPost'
import {useNavigate} from 'react-router-dom'
import {PersistProfile, TokenAuth} from '../../interfaces/profileLocalStorage.interface'
import {Wrapper} from "./DragAndDrop.styles"
import {JWTToken} from "../../features/authSlice";
import jwtDecode from "jwt-decode";

function DragAndDrop() {
    const [showDragAndDrop, setShowDragAndDrop] = useState(true)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true)
    const [showPostDetails, setShowPostDetails] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('persist:profile') === null) {
            setIsUserLoggedIn(() => false)
        } else {
            const profile: PersistProfile = JSON.parse(localStorage.getItem('persist:profile') || '{}')
            const token: TokenAuth = JSON.parse(profile.auth)

            if (token.access !== null) {
                const accessToken: JWTToken = jwtDecode(token.access)
                if (accessToken.username !== null) {
                    setIsUserLoggedIn(() => true)
                }
            } else {
                setIsUserLoggedIn(() => false)
            }
        }
    }, [])

    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate('/login', {replace: false})
        }
    }, [isUserLoggedIn, navigate])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file: File) => {
            const reader = new FileReader()

            setShowPostDetails(() => true)
            setShowDragAndDrop(() => false)
            reader.onload = function (e) {
                setImage(e.target!.result as string)
            }
            reader.readAsDataURL(file);
            return file
        })
    }, [])
    const [image, setImage] = useState<string | null>('')

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/jpeg': [],
        },
        multiple: false,
        onDrop
    })

    return <>
        {showPostDetails && image !== null ? <PublishPost image={image} alt={''}/> : ''}
        <Wrapper>
            {showDragAndDrop ? <div className='popup-window'>
                <div className={'photo-input'} {...getRootProps()}><input
                    accept={'image/x-png,image/jpg,image/jpeg'} {...getInputProps()} />
                    <div className={'photo-icon-container'}>
                        <AddPhotoAlternateIcon className={'photo-icon'}/>
                        <p className={'drag-and-drop'}>Drag and drop your photos here</p>
                        <button className={'choose-files-btn'}>Choose your files from the computer</button>
                    </div>
                </div>
            </div> : ''}
        </Wrapper>
    </>
}

export default DragAndDrop
