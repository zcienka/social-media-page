import React, {useEffect, useState} from 'react'
import Navbar from './components/Navbar'
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import HomePage from "./pages/HomePage"
import LogIn from "./pages/LogInSignUp/LogIn"
import SignUp from "./pages/LogInSignUp/SignUp"
import DragAndDrop from "./components/DragAndDrop"
import {refreshToken} from "./features/authSlice"
import {useAppDispatch} from "./app/hooks"
import {PersistProfile, TokenAuth} from "./interfaces/profileLocalStorage.interface"

function App() {
    const dispatch = useAppDispatch()
    const [authTokens, setAuthTokens] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('persist:profile') !== null) {
            const profile: PersistProfile = JSON.parse(localStorage.getItem('persist:profile') || '{}')
            const token: TokenAuth = JSON.parse(profile.auth)
            console.log(token.access)
            console.log('token.access')
            console.log('token.refresh')
            console.log(token.refresh)

            if (token.access !== null) {
                setAuthTokens(() => true)
            }
        }
    }, [])

    useEffect(() => {
        // const fourMinutes = 1000 * 60 * 4
        const fourMinutes = 3000
        const interval = setInterval(() => {

            if (authTokens) {
                dispatch(refreshToken())
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    }, [dispatch, authTokens])

    return (<BrowserRouter basename={process.env.PUBLIC_URL}>
            <Navbar/>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/signup"} element={<SignUp/>}/>
                <Route path={"/login"} element={<LogIn/>}/>
                <Route path={"/upload_photo"} element={<DragAndDrop/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
