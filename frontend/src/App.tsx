import React from 'react'
import Navbar from './components/Navbar'
import {Route, BrowserRouter, Routes,} from 'react-router-dom'
import HomePage from "./pages/HomePage"
import LogIn from "./pages/LogInSignUp/LogIn"
import SignUp from "./pages/LogInSignUp/SignUp"

function App() {
    return (<BrowserRouter basename={process.env.PUBLIC_URL}>
            <Navbar/>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/signup"} element={<SignUp/>}/>
                <Route path={"/login"} element={<LogIn/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
